import React from 'react'

const Navbar = ({section,changeSection}) => {



  return (
    <div className='cus-navbar'>
        <div 
            className={`n-btn ${section === "VdoToASL"  ? "active-tab" : ""}`}
            onClick={() =>{changeSection("VdoToASL")}}
        >
            Video To Text
        </div>
        <div 
            className={`n-btn ${section==="TextToVdo" ? "active-tab" : ""}`}
            onClick={() => {changeSection("TextToVdo")}}
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