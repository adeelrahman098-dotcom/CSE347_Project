-- ICCMS MySQL 8 schema. Run: mysql -u root -p < schema.sql
CREATE DATABASE IF NOT EXISTS iccms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE iccms;

CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(120) NOT NULL, house_address VARCHAR(255),
  email VARCHAR(160) UNIQUE, mobile_number VARCHAR(30) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL,
  role ENUM('ADMIN','TEACHER','STUDENT','PARENT') NOT NULL, is_active BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS registration_requests (
  registration_id INT AUTO_INCREMENT PRIMARY KEY, full_name VARCHAR(120) NOT NULL, house_address VARCHAR(255), email VARCHAR(160), mobile_number VARCHAR(30) NOT NULL, password_hash VARCHAR(255) NOT NULL,
  requested_role ENUM('STUDENT','TEACHER','PARENT') NOT NULL, identification_number VARCHAR(40) NOT NULL, class_name VARCHAR(80), status ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING', approved_by INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, approved_at DATETIME,
  UNIQUE KEY unique_request_mobile (mobile_number), UNIQUE KEY unique_request_id (identification_number), FOREIGN KEY (approved_by) REFERENCES users(user_id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS students (
  student_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL UNIQUE, student_code VARCHAR(40) NOT NULL UNIQUE, class_name VARCHAR(80) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS teachers (
  teacher_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL UNIQUE, teacher_code VARCHAR(40) NOT NULL UNIQUE, subject VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS parents (
  parent_id INT AUTO_INCREMENT PRIMARY KEY, user_id INT NOT NULL UNIQUE, parent_code VARCHAR(40) NOT NULL UNIQUE, student_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE, FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY, course_code VARCHAR(40) NOT NULL UNIQUE, course_name VARCHAR(150) NOT NULL, class_name VARCHAR(80), teacher_id INT,
  FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, course_id INT, attendance_date DATE NOT NULL, status ENUM('PRESENT','ABSENT','LATE') NOT NULL,
  UNIQUE KEY unique_attendance (student_id, course_id, attendance_date), FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE, FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS exams (
  exam_id INT AUTO_INCREMENT PRIMARY KEY, course_id INT, teacher_id INT NOT NULL, exam_title VARCHAR(180) NOT NULL, exam_type VARCHAR(60) NOT NULL, exam_date DATETIME NOT NULL, duration_minutes INT NOT NULL, total_marks DECIMAL(8,2) NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE SET NULL, FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS questions (
  question_id INT AUTO_INCREMENT PRIMARY KEY, exam_id INT NOT NULL, question_text TEXT NOT NULL, question_type ENUM('MCQ','SHORT','DESCRIPTIVE') NOT NULL DEFAULT 'MCQ', option_a TEXT, option_b TEXT, option_c TEXT, option_d TEXT, correct_answer TEXT, marks DECIMAL(8,2) NOT NULL DEFAULT 1,
  FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS results (
  result_id INT AUTO_INCREMENT PRIMARY KEY, exam_id INT NOT NULL, student_id INT NOT NULL, total_marks DECIMAL(8,2) NOT NULL, obtained_marks DECIMAL(8,2) NOT NULL, grade VARCHAR(10), submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_result (exam_id, student_id), FOREIGN KEY (exam_id) REFERENCES exams(exam_id) ON DELETE CASCADE, FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS doubts (
  doubt_id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, teacher_id INT, doubt_text TEXT NOT NULL, image_path VARCHAR(255), status ENUM('PENDING','RESOLVED') NOT NULL DEFAULT 'PENDING', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE, FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS doubt_replies (
  reply_id INT AUTO_INCREMENT PRIMARY KEY, doubt_id INT NOT NULL, teacher_id INT NOT NULL, reply_text TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (doubt_id) REFERENCES doubts(doubt_id) ON DELETE CASCADE, FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS academic_health_scores (
  ahs_id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, final_model_test DECIMAL(5,2) DEFAULT 0, monthly_model_test DECIMAL(5,2) DEFAULT 0, attendance_score DECIMAL(5,2) DEFAULT 0, quiz_score DECIMAL(5,2) DEFAULT 0, viva_score DECIMAL(5,2) DEFAULT 0, english_speaking_score DECIMAL(5,2) DEFAULT 0, total_score DECIMAL(5,2) DEFAULT 0, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_ahs (student_id), FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS fees (
  fee_id INT AUTO_INCREMENT PRIMARY KEY, student_id INT NOT NULL, fee_month DATE NOT NULL, amount DECIMAL(10,2) NOT NULL, due_date DATE, status ENUM('UNPAID','PAID','OVERDUE') NOT NULL DEFAULT 'UNPAID', invoice_number VARCHAR(60) UNIQUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_monthly_fee (student_id, fee_month), FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS payments (
  payment_id INT AUTO_INCREMENT PRIMARY KEY, fee_id INT NOT NULL, student_id INT NOT NULL, amount DECIMAL(10,2) NOT NULL, payment_method ENUM('ONLINE','ONSITE') NOT NULL, transaction_id VARCHAR(120), memo_number VARCHAR(120), payment_status ENUM('PENDING','SUCCESS','FAILED') NOT NULL DEFAULT 'PENDING', payment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fee_id) REFERENCES fees(fee_id) ON DELETE CASCADE, FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS reports (
  report_id INT AUTO_INCREMENT PRIMARY KEY, report_title VARCHAR(180) NOT NULL, report_type VARCHAR(80) NOT NULL, class_name VARCHAR(80), generated_by INT, report_data JSON, generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (generated_by) REFERENCES users(user_id) ON DELETE SET NULL
);

INSERT INTO users (full_name,email,mobile_number,password,role) VALUES ('System Admin','admin@iccms.com','01700000000','Admin@123','ADMIN');
