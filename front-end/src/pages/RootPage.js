import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './rootPage.css'
axios.defaults.withCredentials = true

function RootPage() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            getUser()
        }, 1000)
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
        <div className='rootPage__container'>
            <img src="/resources/loading.svg" alt="loading graphic" />
        </div>
    )
}

export default RootPage