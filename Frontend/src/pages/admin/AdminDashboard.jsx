import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { Link } from 'react-router-dom'
import { ADMIN_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function AdminDashboard() {
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await fetch(
                    apiUrl('/api/admin/summary')
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch summary')
                    return
                }

                setSummary(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        fetchSummary()
    }, [])

    if (loading) {
        return (
            <DashboardLayout navItems={ADMIN_NAV}>
                <div className="page-header">
                    <h1>Admin Dashboard</h1>
                    <p>Loading dashboard...</p>
                </div>
            </DashboardLayout>
        )
    }

    if (error) {
        return (
            <DashboardLayout navItems={ADMIN_NAV}>
                <div className="page-header">
                    <h1>Admin Dashboard</h1>
                    <p className="login-error">{error}</p>
                </div>
            </DashboardLayout>
        )
    }

    const counts = summary?.counts || {}

    return (
        <DashboardLayout navItems={ADMIN_NAV}>

            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>System overview and management</p>
            </div>

            <div className="dashboard-summary">

                <Link to="/admin/students" className="summary-card summary-link">
                    <h3>Students</h3>
                    <p className="summary-number">{counts.total_students ?? 0}</p>
                    <p>Total enrolled students</p>
                </Link>

                <Link to="/admin/teachers" className="summary-card summary-link">
                    <h3>Teachers</h3>
                    <p className="summary-number">{counts.total_teachers ?? 0}</p>
                    <p>Active teachers</p>
                </Link>

                <Link to="/admin/courses" className="summary-card summary-link">
                    <h3>Courses</h3>
                    <p className="summary-number">{counts.total_courses ?? 0}</p>
                    <p>Available courses</p>
                </Link>

                <Link to="/admin/exams" className="summary-card summary-link">
                    <h3>Exams</h3>
                    <p className="summary-number">{counts.total_exams ?? 0}</p>
                    <p>Scheduled exams</p>
                </Link>

            </div>

            <div className="dashboard-welcome">
                <h2>System Stats</h2>
                <p>Total users: {counts.total_users ?? 0}</p>
                <p>Total parents: {counts.total_parents ?? 0}</p>
                <p>Pending doubts: {counts.pending_doubts ?? 0}</p>
                <p>Unpaid fees: ৳{Number(counts.unpaid_fees ?? 0).toFixed(2)}</p>
            </div>

            <div className="dashboard-welcome">
                <h2>Recent Students</h2>

                {summary?.recent_students?.length > 0 ? (
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.recent_students.map((student) => (
                                <tr key={student.student_id}>
                                    <td>{student.student_code}</td>
                                    <td>{student.full_name}</td>
                                    <td>{student.class_name}</td>
                                    <td>{student.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No students found.</p>
                )}
            </div>

        </DashboardLayout>
    )
}

export default AdminDashboard
