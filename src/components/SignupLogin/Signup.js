import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'



const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", username: "", email: "", status: "", work: "", phone: "", dob: "", password: "", cpassword: ""
  });


  const isLogin = async () => {
    try {
      const res = await fetch('/authenticate', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      if (res.status === 200) {
        window.alert("You need to log out before register")
        navigate('/logout');
      }
    } catch (err) {
    }
  }




  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }


  const PostData = async (e) => {
    e.preventDefault();

    const { name, username, email, status, work, phone, dob, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, username, email, status, work, phone, dob, password, cpassword
      })
    });


    if (res.status === 420) {
      window.alert("Fill form completely");
    }
    else if (res.status === 421) {
      window.alert("Email is already used");
    }
    else if (res.status === 422) {
      window.alert("Username is already used");
    }
    else if (res.status === 423) {
      window.alert("Passwords are not matching");
    }
    else if (res.status === 424) {
      window.alert("Email outside of college")
    }
    else if (res.status === 425) {
      window.alert("Password must be of atleast 8 character")
    }
    else {
      navigate("/login");
    }

  }

  useEffect(() => {
    isLogin();

  }, [])



  return (
    <div className="login-page">
      <div className='login shadow-lg'>
        <div className="log-text">
          <p>Sign Up
          </p>
        </div>
        <form method='POST' className='login-form'>
          <div className="login-div ">
            <input type="text" className="login-input" id="name" name='name' autoComplete='off'
              value={user.name}
              onChange={handleInputs}
              placeholder="Name ..."
            />

          </div>
          <div className="login-div">

            <input type="text" className="login-input" id="username" name='username' autoComplete='off'
              value={user.username}
              onChange={handleInputs}
              placeholder="Username ..."
            />

          </div>
          <div className="login-div">
            <input type="email" className="login-input" id="email" name='email' autoComplete='off'
              value={user.email}
              onChange={handleInputs}
              placeholder="Email ..."
            />

          </div>
          <div class="login-div">
            <select id="status" class="login-input" name='status'
              value={user.status}
              onChange={handleInputs}
              placeholder="Select Status"
              required
            >
              <option>Faculty</option>
              <option>1y</option>
              <option>2y</option>
              <option>3y</option>
              <option>4y</option>
              <option>Alumni</option>
            </select>
          </div>
          <div className="login-div">
            <input type="text" className="login-input" id="work" name='work' autoComplete='off'
              value={user.work}
              onChange={handleInputs}
              placeholder="Work ..."
            />
          </div>
          <div className="login-div">
            <input type="tel" className="login-input" id="phone" name='phone' autoComplete='off'
              value={user.phone}
              onChange={handleInputs}
              placeholder="Phone ..."
            />
          </div>

          <div className="login-div">
            <input type="password" className="login-input" id="password" name='password' autoComplete='off'
              value={user.password}
              onChange={handleInputs}
              placeholder="Password (Must be of 8  atleast Char ) ..."
            />
          </div>
          <div className="login-div">
            <input type="password" className="login-input" id="cassword" name='cpassword' autoComplete='off'
              value={user.cpassword}
              onChange={handleInputs}
              placeholder="Confirm password (Must be of 8  atleast Char ) ..."
            />
          </div>
          <div className='login-div'>
            <label for="dob">Birthday:</label>
            <input type="date" id="dob" name="dob" value={user.dob} onChange={handleInputs} />
          </div>
          <button type="submit" className="btn btn-primary" name='signup' id='signup' onClick={PostData}>Submit</button>
        </form>
        <NavLink to="/Login">Already Registerd</NavLink>

      </div>
    </div>

  )
}

export default Signup