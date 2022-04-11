import React, { useContext } from 'react'
import NavBar from '../components/NavBar'
import userContext from '../context/userContext/UserContext'

function HomePage() {
    const [userState, dispatch] = useContext(userContext)
    

    return (
        <>
            <NavBar />
        </>
    )
}

export default HomePage