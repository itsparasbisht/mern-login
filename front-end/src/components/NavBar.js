import React from 'react'
import './navBar.css'

function NavBar() {
  return (
    <nav>
      <div>
        <img src="/resources/our-logo.webp" alt="our logo" />
        <span>Foxconn Industries</span>
      </div>

      <p>
        <span>paras@mail.com</span>
        <button>logout</button>
      </p>
    </nav>
  )
}

export default NavBar