import React from 'react'
import "../../assets/styles/style.css"

const Layout = ({children}) => {
  return (
    <div className='content'>
        {children}
    </div>
  )
}

export default Layout