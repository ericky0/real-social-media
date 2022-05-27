import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import './register.scss'

export default function Register() {
  const navigate = useNavigate()

  const goToLogin = (event: FormEvent) => {
    navigate('/login')
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="left">
          <h3>RealSocial</h3>
          <span><b>Connect</b> with <b>friends</b> and the <b>world</b> around you on <b>RealSocial</b></span>
        </div>
        <div className="right">
          <div>
            <input type="text" placeholder='Username'/>
            <input type="email" placeholder='E-mail'/>
            <input type="password" placeholder='Password'/>
            <input type="password" placeholder='Password Again'/>
            <button className="loginButton">Sign Up</button>
            <button className="registerButton" onClick={goToLogin}>Log into your account</button>
          </div>
        </div>
      </div>
    </div>
  )
}