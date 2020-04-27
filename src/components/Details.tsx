import React from 'react'
import { getCurrentUser } from '../auth/AppUser'
import { Link } from 'gatsby'

const Details = () => {
  const user = getCurrentUser()

  return (
    <>
      <div>
        <h1>Profile Details</h1>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone_number}</p>
        <p>Username: {user.username}</p>
        <Link to="/app/home">Home</Link>
      </div>
    </>
  )
}
export default Details
