import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { PARENT_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function ParentProfile() {
    const { user } = useContext(AuthContext)
    const [profile, setProfile] = useState(null)
    useEffect(() => { if (user?.parent_id) fetch(apiUrl(`/api/parents/${user.parent_id}`)).then(r => r.json()).then(data => setProfile(data.data)) }, [user])
    return <DashboardLayout navItems={PARENT_NAV}><div className="page-header"><h1>Parent Profile</h1><p>Your account and linked student.</p></div>{profile && <div className="profile-card"><div className="profile-item"><span className="profile-label">Name</span><span className="profile-value">{profile.full_name}</span></div><div className="profile-item"><span className="profile-label">Email</span><span className="profile-value">{profile.email || '—'}</span></div><div className="profile-item"><span className="profile-label">Mobile</span><span className="profile-value">{profile.mobile_number}</span></div><div className="profile-item"><span className="profile-label">Linked student</span><span className="profile-value">{profile.student_name || 'Not linked'}</span></div></div>}</DashboardLayout>
}
export default ParentProfile
