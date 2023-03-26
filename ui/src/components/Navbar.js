import React from 'react'

const Navbar = ({section,changeSection}) => {



  return (
    <div className='cus-navbar'>
        <div 
            className={`n-btn ${section  ? "active-tab" : ""}`}
            onClick={() =>{changeSection(true)}}
        >
            Video To Text
        </div>
        <div 
            className={`n-btn ${!section  ? "active-tab" : ""}`}
            onClick={() => {changeSection(false)}}
        >
            Text To Video
        </div>
    </div>
  )
}

export default Navbar    