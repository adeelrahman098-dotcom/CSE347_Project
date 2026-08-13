import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext.jsx'

function StudentResults() {
    const { user } = useContext(AuthContext)

    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(
                    'http://localhost:5000/api/results'
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(
                        data.message ||
                        'Failed to fetch results'
                    )
                    return
                }

                // Get the logged-in student's ID
                const studentId = user?.student_id

                // Filter results for the logged-in student
                const studentResults = data.data.filter(
                    (result) =>
                        Number(result.student_id) ===
                        Number(studentId)
                )

                setResults(studentResults)

            } catch (error) {
                console.error(error)

                setError(
                    'Unable to connect to the server'
                )

            } finally {
                setLoading(false)
            }
        }

        if (user) {
            fetchResults()
        } else {
            // This branch represents an invalid local session, not an external synchronization.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError('Please login to view your results')
            setLoading(false)
        }

    }, [user])


    return (
        <DashboardLayout>

            <div className="page-header">

                <h1>
                    Results
                </h1>

                <p>
                    View your examination results.
                </p>

            </div>


            {loading && (
                <div className="results-card">

                    <p>
                        Loading results...
                    </p>

                </div>
            )}


            {error && (
                <div className="results-card">

                    <p className="login-error">
                        {error}
                    </p>

                </div>
            )}


            {!loading &&
                !error &&
                results.length === 0 && (
                    <div className="results-card">

                        <p>
                            No results available.
                        </p>

                    </div>
                )}


            {!loading &&
                !error &&
                results.length > 0 && (

                    <div className="results-card">

                        <table className="results-table">

                            <thead>

                                <tr>

                                    <th>
                                        Exam
                                    </th>

                                    <th>
                                        Exam Date
                                    </th>

                                    <th>
                                        Total Marks
                                    </th>

                                    <th>
                                        Obtained Marks
                                    </th>

                                    <th>
                                        Grade
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {results.map((result) => (

                                    <tr
                                        key={result.result_id}
                                    >

                                        <td>
                                            {result.exam_id}
                                        </td>

                                        <td>
                                            {result.submitted_at
                                                ? new Date(
                                                    result.submitted_at
                                                ).toLocaleDateString()
                                                : 'N/A'}
                                        </td>

                                        <td>
                                            {result.total_marks}
                                        </td>

                                        <td>
                                            {result.obtained_marks}
                                        </td>

                                        <td>
                                            {result.grade}
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

export default StudentResults
