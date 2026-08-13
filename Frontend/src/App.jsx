import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentExams from './pages/student/StudentExams'
import StudentResults from './pages/student/StudentResults'
import StudentAttendance from './pages/student/StudentAttendance'
import StudentProfile from './pages/student/StudentProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminTeachers from './pages/admin/AdminTeachers'
import AdminCourses from './pages/admin/AdminCourses'
import AdminExams from './pages/admin/AdminExams'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherExams from './pages/teacher/TeacherExams'
import TeacherDoubts from './pages/teacher/TeacherDoubts'
import TeacherProfile from './pages/teacher/TeacherProfile'
import ParentDashboard from './pages/parent/ParentDashboard'
import ParentResults from './pages/parent/ParentResults'
import ParentAttendance from './pages/parent/ParentAttendance'
import ParentFees from './pages/parent/ParentFees'
import ParentProfile from './pages/parent/ParentProfile'
import AdminRegistrations from './pages/admin/AdminRegistrations'
import { Routes, Route } from 'react-router-dom'


function App() {
    return (
        <div className="app">

            <Header />

            <Routes>

                {/* Public pages */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route path="/register" element={<Register />} />


                {/* Protected student pages */}

                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={['STUDENT']}>
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/exams"
                    element={
                        <ProtectedRoute allowedRoles={['STUDENT']}>
                            <StudentExams />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/results"
                    element={
                        <ProtectedRoute allowedRoles={['STUDENT']}>
                            <StudentResults />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/attendance"
                    element={
                        <ProtectedRoute allowedRoles={['STUDENT']}>
                            <StudentAttendance />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/profile"
                    element={
                        <ProtectedRoute allowedRoles={['STUDENT']}>
                            <StudentProfile />
                        </ProtectedRoute>
                    }
                />

                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminStudents /></ProtectedRoute>} />
                <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminTeachers /></ProtectedRoute>} />
                <Route path="/admin/courses" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminCourses /></ProtectedRoute>} />
                <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminExams /></ProtectedRoute>} />
                <Route path="/admin/registrations" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminRegistrations /></ProtectedRoute>} />

                <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherDashboard /></ProtectedRoute>} />
                <Route path="/teacher/exams" element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherExams /></ProtectedRoute>} />
                <Route path="/teacher/doubts" element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherDoubts /></ProtectedRoute>} />
                <Route path="/teacher/profile" element={<ProtectedRoute allowedRoles={['TEACHER']}><TeacherProfile /></ProtectedRoute>} />

                <Route path="/parent/dashboard" element={<ProtectedRoute allowedRoles={['PARENT']}><ParentDashboard /></ProtectedRoute>} />
                <Route path="/parent/results" element={<ProtectedRoute allowedRoles={['PARENT']}><ParentResults /></ProtectedRoute>} />
                <Route path="/parent/attendance" element={<ProtectedRoute allowedRoles={['PARENT']}><ParentAttendance /></ProtectedRoute>} />
                <Route path="/parent/fees" element={<ProtectedRoute allowedRoles={['PARENT']}><ParentFees /></ProtectedRoute>} />
                <Route path="/parent/profile" element={<ProtectedRoute allowedRoles={['PARENT']}><ParentProfile /></ProtectedRoute>} />

            </Routes>

            <Footer />

        </div>
    )
}


export default App
