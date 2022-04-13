import React from 'react'
import './navBar.css'
import Button from '@mui/material/Button';

function NavBar() {
  return (
    <nav>
      <div>
        <img src="/resources/our-logo.webp" alt="our logo" />
        <span>Foxconn Industries</span>
      </div>

      <p>
        <span>paras@mail.com</span>
        <Button variant="contained" color="primary">logout</Button>
      </p>
    </nav>
  )
}

export default NavBar