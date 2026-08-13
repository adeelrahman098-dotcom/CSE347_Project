import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('iccmsUser')

        if (storedUser) {
            return JSON.parse(storedUser)
        }

        return null
    })

    const logout = () => {
        localStorage.removeItem('iccmsUser')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}