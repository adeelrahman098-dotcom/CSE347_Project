import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { ADMIN_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function AdminStudents() {
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(apiUrl('/api/students'))
                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch students')
                    return
                }

                setStudents(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        fetchStudents()
    }, [])

    return (
        <DashboardLayout navItems={ADMIN_NAV}>

            <div className="page-header">
                <h1>Students</h1>
                <p>Manage all enrolled students</p>
            </div>

            {loading && <div className="results-card"><p>Loading students...</p></div>}
            {error && <div className="results-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && (
                <div className="results-card">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.student_id}>
                                    <td>{student.student_id}</td>
                                    <td>{student.student_code}</td>
                                    <td>{student.full_name}</td>
                                    <td>{student.class_name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.mobile_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </DashboardLayout>
    )
}

export default AdminStudents
