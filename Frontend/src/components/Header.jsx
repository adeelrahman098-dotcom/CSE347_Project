import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import { getDashboardPathForRole } from '../utils/roleRoutes'

function Header() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="header">

            <div className="logo">
                <Link to="/" className="header-logo-link">
                    ICCMS
                </Link>
            </div>

            <nav className="nav">
                <Link to="/">Home</Link>

                {user && (
                    <Link to={getDashboardPathForRole(user.role)}>
                        Dashboard
                    </Link>
                )}

                {!user && (
                    <Link to="/login">Login</Link>
                )}

                {user && (
                    <button
                        type="button"
                        className="header-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}
            </nav>

        </header>
    )
}

export default Header
