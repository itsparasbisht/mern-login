import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'

axios.defaults.withCredentials = true

function RootPage() {

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get('/api/auth/get-user')
            console.log(">>>", response)
        }
        catch (error) {
            window.location.href = '/sign-up'
        }
    }
    return (
        <div>RootPage</div>
    )
}

export default RootPage