import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { TEACHER_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function TeacherProfile() {
    const { user } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.teacher_id) {
                setError('Teacher information not found')
                setLoading(false)
                return
            }

            try {
                const response = await fetch(
                    apiUrl(`/api/teachers/${user.teacher_id}`)
                )

                const data = await response.json()

                if (!response.ok) {
                    setError(data.message || 'Failed to fetch profile')
                    return
                }

                setProfile(data.data)
            } catch (fetchError) {
                console.error(fetchError)
                setError('Unable to connect to the server')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [user])

    return (
        <DashboardLayout navItems={TEACHER_NAV}>

            <div className="page-header">
                <h1>Teacher Profile</h1>
                <p>Your account information</p>
            </div>

            {loading && <div className="profile-card"><p>Loading profile...</p></div>}
            {error && <div className="profile-card"><p className="login-error">{error}</p></div>}

            {!loading && !error && profile && (
                <div className="profile-card">
                    <div className="profile-item">
                        <span className="profile-label">Full Name</span>
                        <span className="profile-value">{profile.full_name}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Teacher Code</span>
                        <span className="profile-value">{profile.teacher_code}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Subject</span>
                        <span className="profile-value">{profile.subject}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Email</span>
                        <span className="profile-value">{profile.email}</span>
                    </div>
                    <div className="profile-item">
                        <span className="profile-label">Mobile</span>
                        <span className="profile-value">{profile.mobile_number}</span>
                    </div>
                </div>
            )}

        </DashboardLayout>
    )
}

export default TeacherProfile
