import { FormEvent, useContext, useRef } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import CircularProgress from '@mui/material/CircularProgress';

import './login.scss'
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const email = useRef<HTMLInputElement>(null)
  const password = useRef<HTMLInputElement>(null)
  const {isFetching, dispatch}: any = useContext(AuthContext)
  const navigate = useNavigate()
  
  const goToRegister = (event: FormEvent) => {
    navigate('/register')
  }

  const handleClick = (event: FormEvent) => {
    event.preventDefault()
    loginCall({email: email.current?.value, password: password.current?.value}, dispatch)
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
              type="email" 
              ref={email}
              placeholder='E-mail' 
              required 
            />
            <input 
              type="password" 
              ref={password}
              minLength={6} 
              placeholder='Password' 
              required 
            />
            <button className="loginButton" disabled={isFetching}>
              {
                isFetching 
                ? <CircularProgress className="loading" size="25px"/> 
                : 'Log In'
              }
            </button>
            <span>Forgot Password ?</span>
            <button className="registerButton" onClick={goToRegister} disabled={isFetching}>              {
                isFetching 
                ? <CircularProgress className="loading" size="25px"/> 
                : 'Create a New Account'
              }</button>
          </form>
        </div>
      </div>
    </div>
  )
}