import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate=useNavigate();
  const [user,setUser]=useState({
    status:"",work:"",about:"",phone:""
  })

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  }

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
      if (!(res.status === 200)){
        const error = new Error(res.error);
        throw error
      }
    } catch (err) {
        navigate('/login')
    }
  }


  const UpdateProfile=async(e)=>{
    e.preventDefault();
    const {status,work,about,phone}=user;
    const res = await fetch("/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
         status,work, about,phone
      })
    });
    const data=await res.json();
    if(res.status===200){
      navigate('/home')
    }
    else if(res.status===402){
      window.alert("Fill correct data");
    }
    else{
      window.alert("Some error occured")
    }
  }

  
  useEffect(() => {
    isLogin();
  }, [])


  return (
    <div className="login-page">
      <div className='login  shadow-lg' id="log-form" >
        <div className="log-text">
          <p>Update Profile
          </p>
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
        <form method='POST' className='login-form'>
          <div className="login-div">
            <input type="text" className="login-input" id="work" name='work'
              value={user.work}
              onChange={handleInputs}
              placeholder="Update work  . . ."
            />
          </div>
          <div className="login-div">
            <input type="text" className=" login-input" id="about" name='about'
              value={user.about}
              onChange={handleInputs}
              placeholder="Update about . . ."
            />
          </div>
          <div className="login-div">
            <input type="tel" className=" login-input" id="phone" name='phone'
              value={user.phone}
              onChange={handleInputs}
              placeholder="Enter new phone . . ."
            />
          </div>

          <button type="submit" className="btn btn-primary"
            value="upPorfile"
            onClick={UpdateProfile}
          >Update Profile</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile