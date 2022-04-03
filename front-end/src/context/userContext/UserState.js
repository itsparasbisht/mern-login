import React, { useReducer } from 'react'
import userContext from './UserContext'

function UserState(props) {
    const initialState = {
        isAuthenticated: false
    }

    const reducer = (state, action) => {
        switch(action.type){
            case "VALID-USER":
                return {
                    ...state,
                    isAuthenticated: true
                }
            default:
                return state
        }
    }


  return (
    <userContext.Provider value={useReducer(reducer, initialState)}>
        {props.children}
    </userContext.Provider>
  )
}

export default UserState