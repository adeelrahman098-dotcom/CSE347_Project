import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { PARENT_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function ParentAttendance() {
    const { user } = useContext(AuthContext)
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAttendance = async () => {
            const studentId = user?.linked_student_id

            if (!studentId) {
                setError('No linked student found for this parent account')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    apiUrl(`/api/attendance?student_id=${studentId}`)
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch attendance')
                    return
                }

                setAttendance(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchAttendance()
        }
    }, [user])

    return (
        <DashboardLayout navItems={PARENT_NAV}>

            <div className="page-header">
                <h1>Child Attendance</h1>
                <p>Attendance records for your child</p>
            </div>

            {loading && <div className="attendance-card"><p>Loading attendance...</p></div>}
            {error && <div className="attendance-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && attendance.length === 0 && (
                <div className="attendance-card"><p>No attendance records found.</p></div>
            )}

            {!loading && !error && attendance.length > 0 && (
                <div className="attendance-card">
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>Course</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((record) => (
                                <tr key={record.attendance_id}>
                                    <td>{record.course_name || record.course_id}</td>
                                    <td>
                                        {record.attendance_date
                                            ? new Date(record.attendance_date).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td>{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </DashboardLayout>
    )
}

export default ParentAttendance
