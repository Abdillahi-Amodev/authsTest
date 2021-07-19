import React from 'react'
import {  useHistory } from 'react-router-dom'
import { removeLocalStorage } from '../pages/storage'
import './Header.css'
function Header({username}) {
    const history = useHistory()
    const logout = () => {
     removeLocalStorage()
            history.push('/login')    
    }

    
    return (<>
        <div className='header'>
           <div className="header_contente">
               <div className='avatar'>
                    <img src= 'https://via.placeholder.com/150C?Text=Abdillahi' alt='' /> <span>{username}</span>
               </div>
               <div className='logout'>
                    <button onClick={logout}>Log Out</button>
                </div>
           </div>
        </div>
    </>
    )
}

export default Header
