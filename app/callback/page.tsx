'use client'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Callback = () => {
    const { handleRedirectCallback } = useAuth0()
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            await handleRedirectCallback()
            router.push('/')
        }
        handleCallback()
    }, [handleRedirectCallback, router])

    return <div>Loading...</div>
}

export default Callback
