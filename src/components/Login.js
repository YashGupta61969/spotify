import React from 'react'
import './login.css'
import {loginUrl} from '../spotify'


function Login() {

    

  return (
    <div className='login'>
      <div className="login_container">
          <img className='login_img' src={require('./spotifyLogo.png')} alt="" />
          <a href={loginUrl}>Login</a>
      </div>
    </div>
  )
}

export default Login
