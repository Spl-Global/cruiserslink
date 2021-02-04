import React, { useEffect, useState, useContext } from 'react'
import { auth } from './base'
import ClipLoader from 'react-spinners/ClipLoader'
import { MDBCard, MDBContainer } from 'mdbreact'

const AuthContext = React.createContext()
export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const login = function (email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logout = function () {
        return auth.signOut()
    }
    const resetPassword = function (email) {
        return auth.sendPasswordResetEmail(email)
    }
    const updateEmail = function (newEmail) {
        return currentUser.updateEmail(newEmail)
    }
    const updatePassword = function (newPassword) {
        return currentUser.updatePassword(newPassword)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdTokenResult()
                    .then(idTokenResult => {
                        if (!!idTokenResult.claims.admin) {
                            setCurrentUser({ ...user, admin: idTokenResult.claims.admin });
                            setLoading(false)
                        } else {
                            setCurrentUser(null);
                            setLoading(false)
                        }
                    }).catch(err => {
                        setCurrentUser(null);
                        setLoading(false)
                    })
            } else {
                setCurrentUser(user);
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])
    const value = {
        currentUser, login, logout,
        resetPassword, updateEmail, updatePassword
    }
    // console.log(value)
    return (
        <AuthContext.Provider value={value}>
            {loading ?
                <MDBContainer>
                    <div
                        style={{ height: 400 }}
                        className='border d-flex align-items-center justify-content-center'>
                        <ClipLoader color="#57A4FF" loading={loading} size={150} />
                    </div>
                </MDBContainer> :
                children}
        </AuthContext.Provider>
    )

}