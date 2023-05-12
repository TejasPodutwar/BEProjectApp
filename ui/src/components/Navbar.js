import React from 'react'

const Navbar = ({section,changeSection}) => {



  return (
    <div className='cus-navbar'>
        <div 
            className={`n-btn ${section==="VdoToText"  ? "active-tab" : ""}`}
            onClick={() =>{changeSection("VdoToText")}}
        >
            Video To Text
        </div>
        <div 
            className={`n-btn ${section==="GetVdoASL"  ? "active-tab" : ""}`}
            onClick={() => {changeSection("GetVdoASL")}}
        >
            Text To Video
        </div>
        <div 
            className={`n-btn ${section==="ASLToISL"  ? "active-tab" : ""}`}
            onClick={() => {changeSection("ASLToISL")}}
        >
            ASL To ISL
        </div>
    </div>
  )
}

export default Navbar    