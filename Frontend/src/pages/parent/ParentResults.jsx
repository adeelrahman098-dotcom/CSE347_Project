import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { PARENT_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function ParentResults() {
    const { user } = useContext(AuthContext)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchResults = async () => {
            const studentId = user?.linked_student_id

            if (!studentId) {
                setError('No linked student found for this parent account')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    apiUrl(`/api/results?student_id=${studentId}`)
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch results')
                    return
                }

                setResults(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchResults()
        }
    }, [user])

    return (
        <DashboardLayout navItems={PARENT_NAV}>

            <div className="page-header">
                <h1>Child Results</h1>
                <p>Examination results for your child</p>
            </div>

            {loading && <div className="results-card"><p>Loading results...</p></div>}
            {error && <div className="results-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && results.length === 0 && (
                <div className="results-card"><p>No results available.</p></div>
            )}

            {!loading && !error && results.length > 0 && (
                <div className="results-card">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Date</th>
                                <th>Total Marks</th>
                                <th>Obtained</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result) => (
                                <tr key={result.result_id}>
                                    <td>{result.exam_title || result.exam_id}</td>
                                    <td>
                                        {result.exam_date
                                            ? new Date(result.exam_date).toLocaleDateString()
                                            : 'N/A'}
                                    </td>
                                    <td>{result.total_marks}</td>
                                    <td>{result.obtained_marks}</td>
                                    <td>{result.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </DashboardLayout>
    )
}

export default ParentResults
