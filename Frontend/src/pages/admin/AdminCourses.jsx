import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { ADMIN_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function AdminCourses() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(apiUrl('/api/courses'))
                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch courses')
                    return
                }

                setCourses(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    return (
        <DashboardLayout navItems={ADMIN_NAV}>

            <div className="page-header">
                <h1>Courses</h1>
                <p>All coaching center courses</p>
            </div>

            {loading && <div className="results-card"><p>Loading courses...</p></div>}
            {error && <div className="results-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && (
                <div className="results-card">
                    <table className="results-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.course_id}>
                                    <td>{course.course_id}</td>
                                    <td>{course.course_code}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.description || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </DashboardLayout>
    )
}

export default AdminCourses
