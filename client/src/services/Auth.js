import React, { useEffect, useState, useContext } from 'react'
import {auth} from './base'
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])
    const login = function () { }
    const logout = function () { }
    const resetPassword = function () { }
    const updateEmail = function () { }
    const updatePassword = function () { }
    const value = {
        currentUser, login, logout,
        resetPassword, updateEmail, updatePassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}