import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const isLogin = async () => {
    try {
      const res = await fetch('https://koinnn-backend.onrender.com/authenticate', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      if (res.status === 200) {
        window.alert("You need to log out before Login")
        navigate('/logout');
      }
    } catch (err) {
    }
  }


  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('https://koinnn-backend.onrender.com/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("INvalid credidentials")
    }
    else {
      navigate('/')
    }

  }


  useEffect(() => {
    isLogin();

  }, [])



  return (
    <div className="login-page">
      <div className='login  shadow-lg' id="log-form" >
        <div className="log-text">
          <p>Login
          </p>
        </div>
        <form method='POST' className='login-form'>
          <div className="login-div">
            <input type="email" className="login-input" id="email" name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email . . ."
            />
          </div>
          <div className="login-div">
            <input type="password" className=" login-input" id="password" name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password . . ."
            />
          </div>

          <button type="submit" className="btn btn-primary"
            value="LOG_IN"
            onClick={loginUser}
          >Login</button>

        </form>

        <NavLink to="/Signup" > New User</NavLink>
      </div>
    </div>

  )
}



function po() {
  return (
    <div classNamee="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div classNamee="modal-dialog">
        <div classNamee="modal-content">
          <div classNamee="modal-header">
            <h1 classNamee="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" classNamee="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div classNamee="modal-body">
            ...
          </div>
          <div classNamee="modal-footer">
            <button type="button" classNamee="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" classNamee="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )

}
export default Login