import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/layout'
import Details from '../components/Details'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Home from '../components/Home'
import PrivateRoute from '../components/PrivateRoute'
import Amplify from 'aws-amplify'
const config = require('../aws-exports').default

const App = () => {
  Amplify.configure(config)

  return (
    <Layout>
      <Router>
        <PrivateRoute path="/app/home" component={Home} />
        <PrivateRoute path="/app/details" component={Details} />
        <Login path="/app/login" />
        <SignUp path="/app/signup" />
      </Router>
    </Layout>
  )
}

export default App
