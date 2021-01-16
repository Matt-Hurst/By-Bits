import React, { useState } from 'react';
import { userLogin } from '../../apiService'
import './Login.scss'

const Login = ({ setUserPolicy }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')


  const handleUserChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await userLogin(username, password)
      setUsername('')
      setPassword('')
      setUserPolicy(result)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="login-page-grand-wrapper">
      <h1>Sign In</h1>
      <div className="login-page-grand-wrapper__form-container">
        <form onSubmit={(e) => {
          if (!password || !username) e.preventDefault()  
          else handleSubmit(e)
          }
        }>
          <h3>User Name:</h3>
          <input type="text" name="username" value={username} onChange={handleUserChange}/>
          <h3>Password:</h3>
          <input type="password" name="password" value={password} onChange={handlePasswordChange} data-testid='password-input'/>
          <div  className="login-page-grand-wrapper__form-container__button-container">
            <button>Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;