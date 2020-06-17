import {useCallback, useEffect, useState} from "react";

const storageName = 'userData'


export const useAuth = () => {

    const [token, setToken] = useState<string | null>(null)
    const [userId, setUserId] = useState<number | null>(null)

    const login = useCallback((jwToken, id) => {
        setToken(jwToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwToken
        }))
    },[])

    const logout = () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }

    useEffect(()=> {
        const test = localStorage.getItem(storageName)
        let data = test ? JSON.parse(test) : null
        if(data && data.token){
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, token, userId}
}
