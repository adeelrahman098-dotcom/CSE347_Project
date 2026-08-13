import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import { getDashboardPathForRole } from '../utils/roleRoutes'
import { apiUrl } from '../config/api'

function Login() {
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setMessage('')
        setError('')
        setLoading(true)

        try {
            const response = await fetch(
                apiUrl('/api/users/login'),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            )

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Login failed')
                return
            }

            // Save logged-in user in localStorage
            localStorage.setItem(
                'iccmsUser',
                JSON.stringify(data.data)
            )
            localStorage.setItem('iccmsToken', data.token)

            // Update AuthContext immediately
            setUser(data.data)

            setMessage(data.message)

            console.log('Logged in user:', data.data)

            navigate(getDashboardPathForRole(data.data.role))

        } catch (error) {
            console.error(error)

            setError('Unable to connect to the server')

        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="login-page">

            <div className="login-card">

                <h1>ICCMS</h1>

                <h2>Login</h2>

                <p>
                    Sign in to access your ICCMS account.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>

                </form>

                {message && (
                    <p className="login-success">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                <Link to="/">
                    Back to Home
                </Link>
                <br />
                <Link to="/register">Create a new account</Link>

            </div>

        </main>
    )
}

export default Login
