import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { ADMIN_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function AdminTeachers() {
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await fetch(apiUrl('/api/teachers'))
                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch teachers')
                    return
                }

                setTeachers(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        fetchTeachers()
    }, [])

    return (
        <DashboardLayout navItems={ADMIN_NAV}>

            <div className="page-header">
                <h1>Teachers</h1>
                <p>Manage all teachers</p>
            </div>

            {loading && <div className="results-card"><p>Loading teachers...</p></div>}
            {error && <div className="results-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && (
                <div className="results-card">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Email</th>
                                <th>Mobile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.teacher_id}>
                                    <td>{teacher.teacher_id}</td>
                                    <td>{teacher.teacher_code}</td>
                                    <td>{teacher.full_name}</td>
                                    <td>{teacher.subject}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.mobile_number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </DashboardLayout>
    )
}

export default AdminTeachers
