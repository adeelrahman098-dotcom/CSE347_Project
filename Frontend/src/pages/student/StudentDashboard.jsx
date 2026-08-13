import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'

function StudentDashboard() {
    const { user } = useContext(AuthContext)

    const [dashboard, setDashboard] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchDashboard = async () => {

            if (!user || !user.student_id) {
                setError('Student information not found')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    `http://localhost:5000/api/students/${user.student_id}/dashboard`
                )

                const data = await response.json()

                console.log('Dashboard API response:', data)

                if (!response.ok) {
                    setError(
                        data.message ||
                        'Failed to fetch dashboard'
                    )
                    return
                }

                setDashboard(data.data)

            } catch (error) {
                console.error(error)

                setError(
                    'Unable to connect to the server'
                )

            } finally {
                setLoading(false)
            }
        }

        fetchDashboard()

    }, [user])


    // Loading state
    if (loading) {
        return (
            <DashboardLayout>

                <div className="page-header">

                    <h1>
                        Student Dashboard
                    </h1>

                    <p>
                        Loading dashboard...
                    </p>

                </div>

            </DashboardLayout>
        )
    }


    // Error state
    if (error) {
        return (
            <DashboardLayout>

                <div className="page-header">

                    <h1>
                        Student Dashboard
                    </h1>

                    <p className="login-error">
                        {error}
                    </p>

                </div>

            </DashboardLayout>
        )
    }


    // Prevent rendering if dashboard data is missing
    if (!dashboard) {
        return (
            <DashboardLayout>

                <div className="page-header">

                    <h1>
                        Student Dashboard
                    </h1>

                    <p className="login-error">
                        Dashboard data is not available.
                    </p>

                </div>

            </DashboardLayout>
        )
    }


    return (
        <DashboardLayout>

            {/* Page Header */}

            <div className="page-header">

                <h1>
                    Student Dashboard
                </h1>

                <p>
                    Welcome, {dashboard.student?.full_name || 'Student'}!
                </p>

            </div>


            {/* Dashboard Summary Cards */}

            <div className="dashboard-summary">

                <Link
                    to="/student/exams"
                    className="summary-card summary-link"
                >

                    <h3>
                        Exams
                    </h3>

                    <p className="summary-number">
                        {dashboard.academic?.total_exams ?? 0}
                    </p>

                    <p>
                        Total exams
                    </p>

                </Link>


                <Link
                    to="/student/attendance"
                    className="summary-card summary-link"
                >

                    <h3>
                        Attendance
                    </h3>

                    <p className="summary-number">
                        {dashboard.attendance?.attendance_percentage ?? '0.00'}%
                    </p>

                    <p>
                        Overall attendance
                    </p>

                </Link>


                <Link
                    to="/student/results"
                    className="summary-card summary-link"
                >

                    <h3>
                        Average Marks
                    </h3>

                    <p className="summary-number">
                        {dashboard.academic?.average_marks ?? '0.00'}
                    </p>

                    <p>
                        Average marks
                    </p>

                </Link>


                <Link
                    to="/student/profile"
                    className="summary-card summary-link"
                >

                    <h3>
                        Profile
                    </h3>

                    <p className="summary-number">
                        →
                    </p>

                    <p>
                        View your profile
                    </p>

                </Link>

            </div>


            {/* Student Information */}

            <div className="dashboard-welcome">

                <h2>
                    Student Information
                </h2>

                <p>
                    Student ID:{' '}
                    {dashboard.student?.student_code || 'N/A'}
                </p>

                <p>
                    Class:{' '}
                    {dashboard.student?.class_name || 'N/A'}
                </p>

                <p>
                    Name:{' '}
                    {dashboard.student?.full_name || 'N/A'}
                </p>

            </div>


            {/* Attendance Summary */}

            <div className="dashboard-welcome">

                <h2>
                    Attendance Summary
                </h2>

                <p>
                    Total classes:{' '}
                    {dashboard.attendance?.total_classes ?? 0}
                </p>

                <p>
                    Present classes:{' '}
                    {dashboard.attendance?.present_classes ?? 0}
                </p>

                <p>
                    Absent classes:{' '}
                    {dashboard.attendance?.absent_classes ?? 0}
                </p>

                <p>
                    Attendance percentage:{' '}
                    {dashboard.attendance?.attendance_percentage ?? '0.00'}%
                </p>

            </div>


            {/* Academic Summary */}

            <div className="dashboard-welcome">

                <h2>
                    Academic Summary
                </h2>

                <p>
                    Total exams:{' '}
                    {dashboard.academic?.total_exams ?? 0}
                </p>

                <p>
                    Total marks:{' '}
                    {dashboard.academic?.total_marks ?? '0.00'}
                </p>

                <p>
                    Obtained marks:{' '}
                    {dashboard.academic?.obtained_marks ?? '0.00'}
                </p>

                <p>
                    Average marks:{' '}
                    {dashboard.academic?.average_marks ?? '0.00'}
                </p>

            </div>


            {/* Fee & Payment Summary - 70.8.7 */}

            <div className="dashboard-welcome">

                <h2>
                    Fee & Payment Summary
                </h2>

                <p>
                    Total fees:{' '}
                    {dashboard.fees?.total_fees ?? 0}
                </p>

                <p>
                    Total fee amount:{' '}
                    ৳{dashboard.fees?.total_fee_amount ?? '0.00'}
                </p>

                <p>
                    Paid fee amount:{' '}
                    ৳{dashboard.fees?.paid_fee_amount ?? '0.00'}
                </p>

                <p>
                    Unpaid fee amount:{' '}
                    ৳{dashboard.fees?.unpaid_fee_amount ?? '0.00'}
                </p>

                <p>
                    Total payments:{' '}
                    {dashboard.payments?.total_payments ?? 0}
                </p>

                <p>
                    Successful payment amount:{' '}
                    ৳{
                        dashboard.payments?.successful_payment_amount
                        ?? '0.00'
                    }
                </p>

            </div>

        </DashboardLayout>
    )
}

export default StudentDashboard