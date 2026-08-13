import { useEffect, useState } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { ADMIN_NAV } from '../../config/navigation'
import { authFetch } from '../../config/authFetch'

function AdminRegistrations() {
    const [requests, setRequests] = useState([]); const [error, setError] = useState(''); const [message, setMessage] = useState('')
    const load = async () => { try { const response = await authFetch('/api/registrations'); const data = await response.json(); if (!response.ok) throw new Error(data.message); setRequests(data.data) } catch (err) { setError(err.message || 'Unable to load registrations') } }
    // Fetches are asynchronous; this exemption avoids a false positive from the React compiler rule.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { load() }, [])
    const approve = async id => { setError(''); setMessage(''); try { const response = await authFetch(`/api/registrations/${id}/approve`, { method: 'POST' }); const data = await response.json(); if (!response.ok) throw new Error(data.message); setMessage(data.message); load() } catch (err) { setError(err.message) } }
    return <DashboardLayout navItems={ADMIN_NAV}><div className="page-header"><h1>Registration Requests</h1><p>Approve accounts after checking their information.</p></div>{message && <p className="login-success">{message}</p>}{error && <p className="login-error">{error}</p>}<div className="results-card"><table className="results-table"><thead><tr><th>Name</th><th>Role</th><th>ID</th><th>Class</th><th>Mobile</th><th>Status</th><th>Action</th></tr></thead><tbody>{requests.map(request => <tr key={request.registration_id}><td>{request.full_name}<br />{request.email}</td><td>{request.requested_role}</td><td>{request.identification_number}</td><td>{request.class_name || '—'}</td><td>{request.mobile_number}</td><td>{request.status}</td><td>{request.status === 'PENDING' && <button className="login-submit" onClick={() => approve(request.registration_id)}>Approve</button>}</td></tr>)}{!requests.length && <tr><td colSpan="7">No registration requests.</td></tr>}</tbody></table></div></DashboardLayout>
}
export default AdminRegistrations
