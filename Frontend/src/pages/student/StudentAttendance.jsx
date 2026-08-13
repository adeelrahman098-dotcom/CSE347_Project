import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'

function StudentAttendance() {
    const { user } = useContext(AuthContext)

    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/attendance'
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(
                        data.message ||
                        'Failed to fetch attendance'
                    )
                    return
                }

                const studentId = user?.student_id

                // Only keep attendance records
                // belonging to the logged-in student
                const studentAttendance = data.data.filter(
                    (record) =>
                        Number(record.student_id) ===
                        Number(studentId)
                )

                // Group attendance by course
                const courseMap = {}

                studentAttendance.forEach((record) => {
                    const courseId = record.course_id

                    if (!courseMap[courseId]) {
                        courseMap[courseId] = {
                            course_id: courseId,
                            course_name:
                                record.course_name ||
                                `Course ${courseId}`,
                            present: 0,
                            total: 0
                        }
                    }

                    courseMap[courseId].total += 1

                    if (
                        String(record.status).toUpperCase() ===
                        'PRESENT'
                    ) {
                        courseMap[courseId].present += 1
                    }
                })

                const courseAttendance =
                    Object.values(courseMap).map((course) => ({
                        ...course,
                        percentage:
                            course.total > 0
                                ? (
                                    (course.present /
                                        course.total) *
                                    100
                                ).toFixed(2)
                                : '0.00'
                    }))

                setAttendance(courseAttendance)

            } catch (error) {
                console.error(error)

                setError(
                    'Unable to connect to the server'
                )

            } finally {
                setLoading(false)
            }
        }

        if (user?.student_id) {
            fetchAttendance()
        } else {
            // This branch represents an invalid local session, not an external synchronization.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError(
                'Please login again to view your attendance'
            )
            setLoading(false)
        }

    }, [user])


    return (
        <DashboardLayout>

            <div className="page-header">

                <h1>
                    Attendance
                </h1>

                <p>
                    View your attendance records.
                </p>

            </div>


            {loading && (
                <div className="attendance-card">

                    <p>
                        Loading attendance...
                    </p>

                </div>
            )}


            {error && (
                <div className="attendance-card">

                    <p className="login-error">
                        {error}
                    </p>

                </div>
            )}


            {!loading &&
                !error &&
                attendance.length === 0 && (
                    <div className="attendance-card">

                        <p>
                            No attendance records available.
                        </p>

                    </div>
                )}


            {!loading &&
                !error &&
                attendance.length > 0 && (

                    <div className="attendance-card">

                        <table className="attendance-table">

                            <thead>

                                <tr>

                                    <th>
                                        Course
                                    </th>

                                    <th>
                                        Present
                                    </th>

                                    <th>
                                        Total Classes
                                    </th>

                                    <th>
                                        Attendance
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {attendance.map((course) => (

                                    <tr
                                        key={course.course_id}
                                    >

                                        <td>
                                            {course.course_name}
                                        </td>

                                        <td>
                                            {course.present}
                                        </td>

                                        <td>
                                            {course.total}
                                        </td>

                                        <td>
                                            {course.percentage}%
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

        </DashboardLayout>
    )
}

export default StudentAttendance
