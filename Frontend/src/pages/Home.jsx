import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

function Home() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <main>

            <section className="hero">

                <h2>
                    Intelligent Coaching Center
                    Management System
                </h2>

                <p>
                    A centralized platform for managing
                    coaching center activities and academic progress.
                </p>

                {user && (
                    <div className="user-welcome">

                        <h3>
                            Welcome, {user.full_name}!
                        </h3>

                        <p>
                            Role: {user.role}
                        </p>

                    </div>
                )}

                {!user && (
                    <button
                        className="login-button"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                )}

            </section>

        </main>
    )
}

export default Home