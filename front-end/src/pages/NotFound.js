import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import './notFound.css'

function NotFound() {
  return (
    <div className='notFound__container'>
      <ErrorIcon className="notFound__container-icon" />
      <div className='notFound__container-detail'>
        <h3>404 error</h3>
        <h5>Sorry, page not found :(</h5>
      </div>
    </div>
  )
}

export default NotFound