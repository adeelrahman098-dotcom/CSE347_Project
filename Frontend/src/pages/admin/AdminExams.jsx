import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { ADMIN_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function AdminExams() {
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await fetch(apiUrl('/api/exams'))
                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch exams')
                    return
                }

                setExams(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        fetchExams()
    }, [])

    return (
        <DashboardLayout navItems={ADMIN_NAV}>

            <div className="page-header">
                <h1>Exams</h1>
                <p>All scheduled examinations</p>
            </div>

            {loading && <div className="results-card"><p>Loading exams...</p></div>}
            {error && <div className="results-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && (
                <div className="exam-list">
                    {exams.map((exam) => (
                        <div className="exam-card" key={exam.exam_id}>
                            <div>
                                <h2>{exam.exam_title}</h2>
                                <p>Type: {exam.exam_type}</p>
                                <p>Course ID: {exam.course_id}</p>
                                <p>Teacher ID: {exam.teacher_id}</p>
                                <p>Date: {new Date(exam.exam_date).toLocaleString()}</p>
                                <p>Total Marks: {exam.total_marks}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </DashboardLayout>
    )
}

export default AdminExams
