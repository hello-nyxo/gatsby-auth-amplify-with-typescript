import React, { useState } from 'react'
import { navigate } from '@reach/router'
import { isLoggedIn, setUser } from '../auth/AppUser'
import { Link } from 'gatsby'
import { Auth } from 'aws-amplify'

const Login = ({ path }: { path: string }) => {
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [error, setError] = useState()

  const handleEmail = (event: any) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event: any) => {
    setPassword(event.target.value)
  }

  const login = async (event: any) => {
    event.preventDefault()

    try {
      await Auth.signIn(email, password)
      const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        username: user.username,
      }
      setUser(userInfo)
      navigate('/app/details')
    } catch (err) {
      setError(err)
      console.log(err)
    }
  }
  if (isLoggedIn()) {
    navigate('/app/details')
    return null
  }
  return (
    <div>
      <h1>Login</h1>
      {error && <p>{error.message}</p>}
      <form onSubmit={login}>
        <input
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
          type="password"
          name="password"
          value={password}
        />
        <br></br>
        <br></br>
        <button type="submit">Login</button>
      </form>
      <p>
        No account with us yet? <Link to="/app/signup">Register</Link>.
      </p>
    </div>
  )
}
export default Login
