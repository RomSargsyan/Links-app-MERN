import { useState, useEffect, useCallback } from "react"

const storageName = 'user data'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserID] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((jwtToken, Id) => {
        setToken(jwtToken)
        setUserID(Id)

        localStorage.setItem(storageName, JSON.stringify({
            userId: Id, token: jwtToken
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem(storageName);
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        if (data && data.token) {
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}