import React, { useContext } from 'react'
import userContext from '../context/userContext/UserContext'

function HomePage() {
    const [userState, dispatch] = useContext(userContext)
    

    return (
        <div>HomePage</div>
    )
}

export default HomePage