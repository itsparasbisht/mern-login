import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true

function RootPage() {
    const navigate = useNavigate()

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        try {
            const response = await axios.get('/api/auth/get-user')
            navigate('/home')
        }
        catch (error) {
            navigate('/log-in')
        }
    }
    return (
        <div>Loading</div>
    )
}

export default RootPage