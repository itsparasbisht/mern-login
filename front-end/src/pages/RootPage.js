import axios from 'axios'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/userContext/UserContext'
import './rootPage.css'
axios.defaults.withCredentials = true

function RootPage() {
    const navigate = useNavigate()

    // user context
    const [userState, dispatch] = useContext(userContext)

    useEffect(() => {
        setTimeout(() => {
            getUser()
        }, 1000)
    }, [])

    const getUser = async () => {
        try {
            await axios.get('/api/auth/get-user')
            dispatch({type: "VALID-USER"})
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