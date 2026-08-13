import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import StudentDashboard from './pages/student/StudentDashboard'
import StudentExams from './pages/student/StudentExams'
import StudentResults from './pages/student/StudentResults'
import StudentAttendance from './pages/student/StudentAttendance'
import StudentProfile from './pages/student/StudentProfile'
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


                {/* Protected student pages */}

                <Route
                    path="/student/dashboard"
                    element={
                        <ProtectedRoute>
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/exams"
                    element={
                        <ProtectedRoute>
                            <StudentExams />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/results"
                    element={
                        <ProtectedRoute>
                            <StudentResults />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/attendance"
                    element={
                        <ProtectedRoute>
                            <StudentAttendance />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/student/profile"
                    element={
                        <ProtectedRoute>
                            <StudentProfile />
                        </ProtectedRoute>
                    }
                />

            </Routes>

            <Footer />

        </div>
    )
}


export default App