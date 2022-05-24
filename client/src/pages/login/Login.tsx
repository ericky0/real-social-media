import './login.scss'

export default function Login() {
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="left">
          <h3>RealSocial</h3>
          <span><b>Connect</b> with <b>friends</b> and the <b>world</b> around you on <b>RealSocial</b></span>
        </div>
        <div className="right">
          <div>
            <input type="email" placeholder='E-mail'/>
            <input type="password" placeholder='Password'/>
            <button className="loginButton">Log In</button>
            <span>Forgot Password ?</span>
            <button className="registerButton">Create a New Account</button>
          </div>
        </div>
      </div>
    </div>
  )
}