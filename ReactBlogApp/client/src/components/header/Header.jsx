import React from 'react'
import "./header.css"

export default function Header() {
  return (
    <div className='header'>
        <div className='headerTitles'>
            <span className='headerTitleSm'> React & Node </span>
            <span className='headerTitleLg'> Blog </span>
        </div>
        <img className='headerImg' src='https://images.pexels.com/photos/9221328/pexels-photo-9221328.jpeg?cs=srgb&dl=pexels-adrien-olichon-9221328.jpg&fm=jpg' alt=''></img>
    </div>
  )
}
