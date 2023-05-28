import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Setting = () => {
  const navigate = useNavigate();
  const auth = async () => {
    try {
      const res = await fetch("/authenticate", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      if (!(res.status === 200)) {
        const error = new Error(res.error);
        throw error
      }
    } catch (error) {
      navigate('/login')
    }
  }

  useEffect(() => {
    auth();
  }, [])

  return (
    <div className='setting'>
      <div className="set-card shadow-sm">
        <span>Edit your pofile </span>
        <Link to="/editprofile">
          <button type="button" class="btn btn-primary">Edit Profile</button>
        </Link>
      </div>
      <div className="set-card shadow-sm">
        <span>Change Password </span>
        <Link to="/changepassword">
          <button type="button" class="btn btn-primary">Change Password</button>
        </Link>
      </div>
    </div>
  )
}

export default Setting