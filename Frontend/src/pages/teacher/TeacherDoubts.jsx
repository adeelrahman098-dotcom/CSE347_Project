import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { TEACHER_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function TeacherDoubts() {
    const { user } = useContext(AuthContext)
    const [doubts, setDoubts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchDoubts = async () => {
            if (!user?.teacher_id) {
                setError('Teacher information not found')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    apiUrl(`/api/teachers/${user.teacher_id}/doubts`)
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch doubts')
                    return
                }

                setDoubts(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        fetchDoubts()
    }, [user])

    return (
        <DashboardLayout navItems={TEACHER_NAV}>

            <div className="page-header">
                <h1>Student Doubts</h1>
                <p>Questions submitted by students</p>
            </div>

            {loading && <div className="results-card"><p>Loading doubts...</p></div>}
            {error && <div className="results-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && (
                <div className="results-card">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Code</th>
                                <th>Doubt</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doubts.map((doubt) => (
                                <tr key={doubt.doubt_id}>
                                    <td>{doubt.student_name}</td>
                                    <td>{doubt.student_code}</td>
                                    <td>{doubt.doubt_text}</td>
                                    <td>{doubt.status}</td>
                                    <td>
                                        {doubt.created_at
                                            ? new Date(doubt.created_at).toLocaleDateString()
                                            : 'N/A'}
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

export default TeacherDoubts
