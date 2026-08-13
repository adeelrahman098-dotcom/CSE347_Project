import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { getDashboardPathForRole } from '../utils/roleRoutes'

function ProtectedRoute({ children, allowedRoles }) {

    const { user } = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (
        allowedRoles &&
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {
        return (
            <Navigate
                to={getDashboardPathForRole(user.role)}
                replace
            />
        )
    }

    return children
}

export default ProtectedRoute
