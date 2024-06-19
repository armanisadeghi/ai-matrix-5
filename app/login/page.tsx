'use client'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect()
        } else {
            router.push('/')
        }
    }, [loginWithRedirect, isAuthenticated])

    return <div>Loading...</div>
}

export default Login
