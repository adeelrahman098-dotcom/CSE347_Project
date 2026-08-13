import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { TEACHER_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function TeacherDashboard() {
    const { user } = useContext(AuthContext)
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchSummary = async () => {
            if (!user?.teacher_id) {
                setError('Teacher information not found')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    apiUrl(`/api/teachers/${user.teacher_id}/summary`)
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch dashboard')
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
    }, [user])

    if (loading) {
        return (
            <DashboardLayout navItems={TEACHER_NAV}>
                <div className="page-header">
                    <h1>Teacher Dashboard</h1>
                    <p>Loading dashboard...</p>
                </div>
            </DashboardLayout>
        )
    }

    if (error) {
        return (
            <DashboardLayout navItems={TEACHER_NAV}>
                <div className="page-header">
                    <h1>Teacher Dashboard</h1>
                    <p className="login-error">{error}</p>
                </div>
            </DashboardLayout>
        )
    }

    const stats = summary?.stats || {}

    return (
        <DashboardLayout navItems={TEACHER_NAV}>

            <div className="page-header">
                <h1>Teacher Dashboard</h1>
                <p>Welcome, {summary?.teacher?.full_name || 'Teacher'}!</p>
            </div>

            <div className="dashboard-summary">

                <Link to="/teacher/exams" className="summary-card summary-link">
                    <h3>Exams</h3>
                    <p className="summary-number">{stats.total_exams ?? 0}</p>
                    <p>Exams created</p>
                </Link>

                <Link to="/teacher/exams" className="summary-card summary-link">
                    <h3>Courses</h3>
                    <p className="summary-number">{stats.total_courses ?? 0}</p>
                    <p>Courses taught</p>
                </Link>

                <Link to="/teacher/doubts" className="summary-card summary-link">
                    <h3>Pending Doubts</h3>
                    <p className="summary-number">{stats.pending_doubts ?? 0}</p>
                    <p>Awaiting response</p>
                </Link>

                <Link to="/teacher/profile" className="summary-card summary-link">
                    <h3>Profile</h3>
                    <p className="summary-number">→</p>
                    <p>View your profile</p>
                </Link>

            </div>

            <div className="dashboard-welcome">
                <h2>Teacher Information</h2>
                <p>Code: {summary?.teacher?.teacher_code || 'N/A'}</p>
                <p>Subject: {summary?.teacher?.subject || 'N/A'}</p>
                <p>Email: {summary?.teacher?.email || 'N/A'}</p>
                <p>Resolved doubts: {stats.resolved_doubts ?? 0}</p>
            </div>

            <div className="dashboard-welcome">
                <h2>Recent Exams</h2>
                {summary?.recent_exams?.length > 0 ? (
                    summary.recent_exams.map((exam) => (
                        <p key={exam.exam_id}>
                            {exam.exam_title} — {exam.course_name || 'N/A'} —{' '}
                            {new Date(exam.exam_date).toLocaleDateString()}
                        </p>
                    ))
                ) : (
                    <p>No exams found.</p>
                )}
            </div>

            <div className="dashboard-welcome">
                <h2>Recent Doubts</h2>
                {summary?.recent_doubts?.length > 0 ? (
                    summary.recent_doubts.map((doubt) => (
                        <p key={doubt.doubt_id}>
                            {doubt.student_name}: {doubt.doubt_text?.slice(0, 80)}... — {doubt.status}
                        </p>
                    ))
                ) : (
                    <p>No doubts found.</p>
                )}
            </div>

        </DashboardLayout>
    )
}

export default TeacherDashboard
