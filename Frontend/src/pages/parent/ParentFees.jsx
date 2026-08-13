import { useEffect, useState, useContext } from 'react'
import DashboardLayout from '../../layouts/DashboardLayout'
import { AuthContext } from '../../context/AuthContext.jsx'
import { PARENT_NAV } from '../../config/navigation'
import { apiUrl } from '../../config/api'

function ParentFees() {
    const { user } = useContext(AuthContext)
    const [fees, setFees] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        fetch(apiUrl('/api/fees')).then(async response => {
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            setFees(data.data.filter(fee => Number(fee.student_id) === Number(user?.linked_student_id)))
        }).catch(err => setError(err.message || 'Unable to load fees'))
    }, [user])
    return <DashboardLayout navItems={PARENT_NAV}>
        <div className="page-header"><h1>Fees & Payments</h1><p>View your child’s invoices and payment status.</p></div>
        {error ? <div className="results-card"><p className="login-error">{error}</p></div> : <div className="results-card"><table className="results-table"><thead><tr><th>Invoice</th><th>Month</th><th>Amount</th><th>Due date</th><th>Status</th></tr></thead><tbody>{fees.length ? fees.map(fee => <tr key={fee.fee_id}><td>{fee.invoice_number || '—'}</td><td>{fee.fee_month ? new Date(fee.fee_month).toLocaleDateString() : '—'}</td><td>৳{fee.amount}</td><td>{fee.due_date ? new Date(fee.due_date).toLocaleDateString() : '—'}</td><td>{fee.status}</td></tr>) : <tr><td colSpan="5">No invoices available.</td></tr>}</tbody></table></div>}
    </DashboardLayout>
}
export default ParentFees
