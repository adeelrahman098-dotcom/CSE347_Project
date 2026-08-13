/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('iccmsUser')

        if (storedUser) {
            try { return JSON.parse(storedUser) } catch { localStorage.removeItem('iccmsUser'); return null }
        }

        return null
    })

    const logout = () => {
        localStorage.removeItem('iccmsUser')
        localStorage.removeItem('iccmsToken')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
