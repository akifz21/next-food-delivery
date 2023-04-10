import { useState } from "react";
import { createContext } from "react";
import jwtDecode from 'jwt-decode'
import { useEffect } from "react";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import { toast } from "react-toastify";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({ userId: 0, userName: "", email: "" })
    const [auth, setAuth] = useState(false)
    const router = useRouter();

    const login = (token) => {
        setAuth(true)
        Cookies.set("token", token)
        router.push("/")
    }

    const isLoggedIn = () => {
        const token = Cookies.get("token")
        if (token) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }

    const logout = () => {
        setAuth(false)
        Cookies.remove("token")
        toast.success("Çıkış yapıldı")
        router.push("/")
    }

    useEffect(() => {
        isLoggedIn()
    }, [auth])


    const values = {
        setAuth,
        auth,
        user,
        login,
        logout
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export default AuthContext