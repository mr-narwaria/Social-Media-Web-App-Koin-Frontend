import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const ChangePass = () => {
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [conNewPass,setConNewPass]=useState('');


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


  const updatePass = async (e) => {
    e.preventDefault();
    const res = await fetch('/updatePass', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        oldPass, newPass,conNewPass
      })
    })
    const data = await res.json();
    if(res.status===200){
      window.alert("passord updated successfully")
      navigate('/')
    }
    else{
      window.alert(data.error)
    }
  }


  useEffect(() => {
    isLogin();
  }, [])



  return (
    <div className="login-page">
      <div className='login  shadow-lg' id="log-form" >
        <div className="log-text">
          <p>Change Password
          </p>
        </div>
        <form method='POST' className='login-form'>
          <div className="login-div">
            <input type="password" className="login-input" id="oldPass" name='oldPass'
              value={oldPass}
              onChange={(e) => setOldPass(e.target.value)}
              placeholder="Old Password  . . ."
            />
          </div>
          <div className="login-div">
            <input type="password" className=" login-input" id="newPass" name='newPass'
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="New Password . . ."
            />
          </div>
          <div className="login-div">
            <input type="password" className=" login-input" id="conNewPass" name='conNewPass'
              value={conNewPass}
              onChange={(e) => setConNewPass(e.target.value)}
              placeholder="Confirm New Password . . ."
            />
          </div>

          <button type="submit" className="btn btn-primary"
            value="upPass"
            onClick={updatePass}
          >Change Pass</button>
        </form>
      </div>
    </div>

  )
}



export default ChangePass