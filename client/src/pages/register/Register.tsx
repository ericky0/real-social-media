import { FormEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

import './register.scss'

export default function Register() {
  const navigate = useNavigate()

  const username = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const passwordAgain = useRef<HTMLInputElement>(null)

  const handleClick = async (event: FormEvent) => {
    event.preventDefault()
    if(passwordAgain.current?.value !== password.current?.value) {
      password.current?.setCustomValidity("Passwords don't match!")
    } else {
      const user = {
        username: username.current?.value,
        email: email.current?.value,
        password: password.current?.value
      }
      try { 
        await api.post('/auth/register', user)
        navigate('/login')
      } catch (err) {
        
      }
    }
    return console.log('password')
  }

  const goToLogin = (event: FormEvent) => {
    event.preventDefault()
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
          <form onSubmit={handleClick}>
            <input 
              type="text" 
              placeholder='Username' 
              ref={username} 
              required
            />
            <input 
              type="email" 
              placeholder='E-mail' 
              ref={email} 
              required
            />
            <input 
              type="password" 
              placeholder='Password' 
              ref={password} 
              minLength={6}
              required
            />
            <input 
              type="password" 
              placeholder='Password Again' 
              ref={passwordAgain} 
              minLength={6}
              required
            />
            <button className="loginButton" type='submit'>Sign Up</button>
            <button className="registerButton" onClick={goToLogin}>Log into your account</button>
          </form>
        </div>
      </div>
    </div>
  )
}