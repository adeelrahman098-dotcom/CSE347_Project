import { Link } from 'react-router-dom'

function DashboardLayout({ children, navItems = [] }) {
    return (
        <div className="dashboard-layout">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    ICCMS
                </div>

                <nav className="sidebar-nav">

                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                        >
                            {item.label}
                        </Link>
                    ))}

                </nav>

            </aside>


            <main className="dashboard-content">

                {children}

            </main>

        </div>
    )
}

export default DashboardLayout
