import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { TEACHER_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function TeacherExams() {
    const { user } = useContext(AuthContext)
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchExams = async () => {
            if (!user?.teacher_id) {
                setError('Teacher information not found')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    apiUrl(`/api/teachers/${user.teacher_id}/exams`)
                )

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
    }, [user])

    return (
        <DashboardLayout navItems={TEACHER_NAV}>

            <div className="page-header">
                <h1>My Exams</h1>
                <p>Examinations you have created</p>
            </div>

            {loading && <div className="exam-list"><div className="exam-card"><p>Loading exams...</p></div></div>}
            {error && <div className="exam-list"><div className="exam-card"><p className="login-error">{error}</p></div></div>}

            {!loading && !error && exams.length === 0 && (
                <div className="exam-list">
                    <div className="exam-card">
                        <p>No exams found.</p>
                    </div>
                </div>
            )}

            {!loading && !error && exams.length > 0 && (
                <div className="exam-list">
                    {exams.map((exam) => (
                        <div className="exam-card" key={exam.exam_id}>
                            <div>
                                <h2>{exam.exam_title}</h2>
                                <p>Type: {exam.exam_type}</p>
                                <p>Course: {exam.course_name || exam.course_id}</p>
                                <p>Date: {new Date(exam.exam_date).toLocaleString()}</p>
                                <p>Duration: {exam.duration_minutes} minutes</p>
                                <p>Total Marks: {exam.total_marks}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </DashboardLayout>
    )
}

export default TeacherExams
