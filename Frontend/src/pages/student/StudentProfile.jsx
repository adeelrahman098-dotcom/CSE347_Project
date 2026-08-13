import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'

function StudentProfile() {
    const { user } = useContext(AuthContext)

    const [student, setStudent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchStudentProfile = async () => {
            try {
                const studentId = user?.student_id

                if (!studentId) {
                    setError(
                        'Student information not found. Please login again.'
                    )
                    return
                }

                const response = await fetch(
                    `http://localhost:5000/api/students/${studentId}`
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(
                        data.message ||
                        'Failed to fetch student profile'
                    )
                    return
                }

                setStudent(data.data)

            } catch (error) {
                console.error(error)

                setError(
                    'Unable to connect to the server'
                )

            } finally {
                setLoading(false)
            }
        }

        fetchStudentProfile()

    }, [user])


    return (
        <DashboardLayout>

            <div className="page-header">

                <h1>
                    My Profile
                </h1>

                <p>
                    View your personal and academic information.
                </p>

            </div>


            {loading && (
                <div className="profile-card">

                    <p>
                        Loading profile...
                    </p>

                </div>
            )}


            {error && (
                <div className="profile-card">

                    <p className="login-error">
                        {error}
                    </p>

                </div>
            )}


            {!loading && !error && student && (

                <div className="profile-card">

                    <div className="profile-item">

                        <span className="profile-label">
                            Name
                        </span>

                        <span className="profile-value">
                            {student.full_name}
                        </span>

                    </div>


                    <div className="profile-item">

                        <span className="profile-label">
                            Student ID
                        </span>

                        <span className="profile-value">
                            {student.student_code}
                        </span>

                    </div>


                    <div className="profile-item">

                        <span className="profile-label">
                            Email
                        </span>

                        <span className="profile-value">
                            {student.email}
                        </span>

                    </div>


                    <div className="profile-item">

                        <span className="profile-label">
                            Mobile Number
                        </span>

                        <span className="profile-value">
                            {student.mobile_number || 'Not provided'}
                        </span>

                    </div>


                    <div className="profile-item">

                        <span className="profile-label">
                            Class
                        </span>

                        <span className="profile-value">
                            {student.class_name}
                        </span>

                    </div>

                </div>

            )}

        </DashboardLayout>
    )
}

export default StudentProfile