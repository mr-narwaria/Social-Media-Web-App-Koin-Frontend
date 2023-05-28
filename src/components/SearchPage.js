import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import profile_pic from "./profile.jpg";

const Follower = () => {

  const [users, setUsers] = useState({});
  const [showUsers, setShowUsers] = useState("hide");
  const [showNoUsers, setShowNoUsers] = useState("hide");



  const getusers = async () => {
    const queryString = window.location.search;

    try {
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('uname');
      console.log(id);
      const res = await fetch(`/searchUser/${id}`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
      const data = await res.json();
      console.log(res.status);
      if (!res.status === 200) {
        console.log("no users")
        const error = new Error(res.error);
        console.log(error);
        throw error;
      }
      
      setUsers(data);
      setShowNoUsers("hide");
      setShowUsers("");

    } catch (error) {
      setShowNoUsers("");
      setShowUsers("hide")
    }
  }

  useEffect(() => {
    getusers();
  }, []);
  return (
    <div className="search-page">
      <div className="main-head">
        <p className='main-head-text'>Search</p>
      </div>
      <div className={`no-user ${showNoUsers} `}>
        <p>
          No Users
        </p>
      </div>
      <div className={`list ${showUsers} `}>
        <div className="list-user shadow-sm  bg-body ">
          <div className="list-profilepic ">
            <img class="list-profilepic-pic " src={profile_pic} />
          </div>
          <div className="list-info">
            <div >
              <Link to={`/profile/${users.username}`} className="list-name">{users.name} </Link>
            </div>
            <div className="list-username">
              <p>@{users.username}</p>
            </div>
            <div className="list-status">
              <p>{users.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Follower