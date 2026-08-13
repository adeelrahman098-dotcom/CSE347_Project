import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../config/api'

function Register() {
    const [form, setForm] = useState({ full_name: '', house_address: '', email: '', mobile_number: '', password: '', requested_role: 'STUDENT', identification_number: '', class_name: '' })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const update = event => setForm({ ...form, [event.target.name]: event.target.value })
    const submit = async event => {
        event.preventDefault(); setLoading(true); setError(''); setMessage('')
        try {
            const response = await fetch(apiUrl('/api/registrations'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            setMessage(data.message)
            setForm({ full_name: '', house_address: '', email: '', mobile_number: '', password: '', requested_role: 'STUDENT', identification_number: '', class_name: '' })
        } catch (requestError) { setError(requestError.message || 'Registration could not be submitted') } finally { setLoading(false) }
    }
    return <main className="login-page"><div className="login-card"><h1>ICCMS</h1><h2>Create account</h2><p>Your account will be available after Admin approval.</p><form onSubmit={submit}>
        <div className="form-group"><label>Full name</label><input name="full_name" value={form.full_name} onChange={update} required /></div>
        <div className="form-group"><label>Address</label><input name="house_address" value={form.house_address} onChange={update} /></div>
        <div className="form-group"><label>Email (optional)</label><input name="email" type="email" value={form.email} onChange={update} /></div>
        <div className="form-group"><label>Mobile number</label><input name="mobile_number" value={form.mobile_number} onChange={update} required /></div>
        <div className="form-group"><label>Role requested</label><select name="requested_role" value={form.requested_role} onChange={update}><option value="STUDENT">Student</option><option value="TEACHER">Teacher</option><option value="PARENT">Parent</option></select></div>
        <div className="form-group"><label>Student / Teacher / Parent ID</label><input name="identification_number" value={form.identification_number} onChange={update} required /></div>
        {form.requested_role === 'STUDENT' && <div className="form-group"><label>Class</label><input name="class_name" value={form.class_name} onChange={update} required /></div>}
        <div className="form-group"><label>Password (minimum 8 characters)</label><input name="password" type="password" value={form.password} onChange={update} minLength="8" required /></div>
        <button type="submit" className="login-submit" disabled={loading}>{loading ? 'Submitting...' : 'Request account'}</button>
    </form>{message && <p className="login-success">{message}</p>}{error && <p className="login-error">{error}</p>}<Link to="/login">Already have an approved account? Login</Link></div></main>
}
export default Register
