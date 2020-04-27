import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { isLoggedIn } from '../auth/AppUser'
import { Link } from 'gatsby'
import Error from './Error'
import { Auth } from 'aws-amplify'

// const Register = function (props) {
const SignUp = ({ path }: { path: string }) => {
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [error, setError] = useState()
  const [stage, setStage] = useState(0)

  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }

  const signUp = async () => {
    try {
      await Auth.signUp({
        username: email,
        password: password,
      })
      setStage(1)
    } catch (err) {
      setError(err)
      console.log('error signing up...', err)
    }
  }

  if (isLoggedIn()) {
    navigate('/app/details')
    return null
  }
  return (
    <div>
      <h1>Register</h1>
      {stage === 0 && (
        <div>
          {error && <p>{error.message}</p>}

          <input
            type="email"
            onChange={handleEmail}
            placeholder="Email"
            name="email"
            value={email}
          />
          <br></br>
          <br></br>
          <input
            onChange={handlePassword}
            placeholder="Password"
            name="password"
            value={password}
            type="password"
          />

          <br></br>
          <br></br>
          <div>
            <button onClick={signUp} type="submit">
              Register
            </button>
          </div>
          <br></br>
        </div>
      )}
      {stage === 1 && (
        <div>
          <h4>Please confirm your email address (check your email).</h4>
        </div>
      )}
      <p>
        Already have an account? <Link to="/app/login">Login</Link>.
      </p>
    </div>
  )
}

export default SignUp
