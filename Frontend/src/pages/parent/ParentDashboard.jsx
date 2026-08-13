import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { PARENT_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function ParentDashboard() {
    const { user } = useContext(AuthContext)
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchSummary = async () => {
            if (!user?.parent_id) {
                setError('Parent information not found')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    apiUrl(`/api/parents/${user.parent_id}/summary`)
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
            <DashboardLayout navItems={PARENT_NAV}>
                <div className="page-header">
                    <h1>Parent Dashboard</h1>
                    <p>Loading dashboard...</p>
                </div>
            </DashboardLayout>
        )
    }

    if (error) {
        return (
            <DashboardLayout navItems={PARENT_NAV}>
                <div className="page-header">
                    <h1>Parent Dashboard</h1>
                    <p className="login-error">{error}</p>
                </div>
            </DashboardLayout>
        )
    }

    const child = summary?.child

    return (
        <DashboardLayout navItems={PARENT_NAV}>

            <div className="page-header">
                <h1>Parent Dashboard</h1>
                <p>Welcome, {summary?.parent?.full_name || 'Parent'}!</p>
            </div>

            {!child && (
                <div className="dashboard-welcome">
                    <p>{summary?.message || 'No student linked to this account.'}</p>
                </div>
            )}

            {child && (
                <>
                    <div className="dashboard-summary">

                        <Link to="/parent/results" className="summary-card summary-link">
                            <h3>Exams</h3>
                            <p className="summary-number">{child.academic?.total_exams ?? 0}</p>
                            <p>Total exams taken</p>
                        </Link>

                        <Link to="/parent/attendance" className="summary-card summary-link">
                            <h3>Attendance</h3>
                            <p className="summary-number">
                                {child.attendance?.attendance_percentage ?? '0.00'}%
                            </p>
                            <p>Overall attendance</p>
                        </Link>

                        <Link to="/parent/results" className="summary-card summary-link">
                            <h3>Average Marks</h3>
                            <p className="summary-number">
                                {Number(child.academic?.average_marks ?? 0).toFixed(2)}
                            </p>
                            <p>Child average marks</p>
                        </Link>

                        <Link to="/parent/fees" className="summary-card summary-link">
                            <h3>Unpaid Fees</h3>
                            <p className="summary-number">
                                ৳{Number(child.fees?.unpaid_fee_amount ?? 0).toFixed(2)}
                            </p>
                            <p>Outstanding amount</p>
                        </Link>

                    </div>

                    <div className="dashboard-welcome">
                        <h2>Child Information</h2>
                        <p>Name: {child.student?.full_name || summary?.parent?.student_name}</p>
                        <p>Code: {child.student?.student_code || summary?.parent?.student_code}</p>
                        <p>Class: {child.student?.class_name || summary?.parent?.class_name}</p>
                    </div>

                    <div className="dashboard-welcome">
                        <h2>Academic Summary</h2>
                        <p>Total exams: {child.academic?.total_exams ?? 0}</p>
                        <p>Obtained marks: {child.academic?.obtained_marks ?? '0.00'}</p>
                        <p>Average marks: {child.academic?.average_marks ?? '0.00'}</p>
                    </div>

                    <div className="dashboard-welcome">
                        <h2>Fee Summary</h2>
                        <p>Total fees: {child.fees?.total_fees ?? 0}</p>
                        <p>Paid: ৳{child.fees?.paid_fee_amount ?? '0.00'}</p>
                        <p>Unpaid: ৳{child.fees?.unpaid_fee_amount ?? '0.00'}</p>
                    </div>
                </>
            )}

        </DashboardLayout>
    )
}

export default ParentDashboard
