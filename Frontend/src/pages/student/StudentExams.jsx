import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'

function StudentExams() {
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/exams'
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(
                        data.message ||
                        'Failed to fetch exams'
                    )
                    return
                }

                setExams(data.data)

            } catch (error) {
                console.error(error)

                setError(
                    'Unable to connect to the server'
                )

            } finally {
                setLoading(false)
            }
        }

        fetchExams()
    }, [])

    return (
        <DashboardLayout>

            <div className="page-header">

                <h1>
                    Exams
                </h1>

                <p>
                    View your available examinations.
                </p>

            </div>


            {loading && (
                <div className="exam-list">

                    <div className="exam-card">

                        <div>
                            <h2>
                                Loading exams...
                            </h2>

                            <p>
                                Please wait while we fetch
                                your examinations.
                            </p>
                        </div>

                    </div>

                </div>
            )}


            {error && (
                <div className="exam-list">

                    <div className="exam-card">

                        <div>
                            <h2>
                                Unable to load exams
                            </h2>

                            <p className="login-error">
                                {error}
                            </p>
                        </div>

                    </div>

                </div>
            )}


            {!loading && !error && exams.length === 0 && (
                <div className="exam-list">

                    <div className="exam-card">

                        <div>
                            <h2>
                                No exams available
                            </h2>

                            <p>
                                There are currently no
                                examinations available.
                            </p>
                        </div>

                    </div>

                </div>
            )}


            {!loading && !error && exams.length > 0 && (
                <div className="exam-list">

                    {exams.map((exam) => (

                        <div
                            className="exam-card"
                            key={exam.exam_id}
                        >

                            <div>

                                <h2>
                                    {exam.exam_title}
                                </h2>

                                <p>
                                    Exam Type: {exam.exam_type}
                                </p>

                                <p>
                                    Course ID: {exam.course_id}
                                </p>

                                <p>
                                    Exam Date:{' '}
                                    {new Date(
                                        exam.exam_date
                                    ).toLocaleString()}
                                </p>

                                <p>
                                    Duration:{' '}
                                    {exam.duration_minutes} minutes
                                </p>

                                <p>
                                    Total Marks:{' '}
                                    {exam.total_marks}
                                </p>

                            </div>


                            <button
                                className="exam-button"
                                type="button"
                            >
                                View Exam
                            </button>

                        </div>

                    ))}

                </div>
            )}

        </DashboardLayout>
    )
}

export default StudentExams