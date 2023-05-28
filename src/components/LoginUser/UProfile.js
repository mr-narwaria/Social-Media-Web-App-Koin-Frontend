
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import profile_pic from "../profile.jpg"


const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [userFollower, setUserFollower] = useState({ follower: 0, following: 0 });
  const [userPosts, setUserPosts] = useState([]);
  const [noOfPost, setNoOfPost] = useState(0);


  const callProfilePage = async () => {
    try {
      const res = await fetch('/authenticate', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserData(data);
      var a = data.follower.length;
      var b = data.following.length;
      var c = data.userpost.length;
      setUserFollower({ follower: a, following: b });
      setNoOfPost(c);
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  }

  const getPost = async () => {
    try {
      const res = await fetch("/getupost", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      const data2 = [...data].sort((a, b) =>
        new Date(b.postdate) - new Date(a.postdate)
      )
      setUserPosts(data2);


    } catch (error) {
      console.log("not logined")
    }
  }



  useEffect(() => {
    getPost();
    callProfilePage();
  }, []);

  return (
    <div className='profile'>
      <div className='profile-page'>
        <div class="padding ">
          <div class="col">
            <div class="card">
              <div class="card-body little-profile text-center">
                <div class="pro-img"><img src={profile_pic} alt="user" /></div>
                <h3 class="m-b-0">{userData.name}</h3>
                <p>@{userData.username}</p>
                <p>{userData.work} &amp; {userData.status}</p>
                <div class="row text-center m-t-20">
                  <div class="col-lg-4 col-md-4 m-t-20">
                    <h3 class="m-b-0 font-light">{userFollower.follower}</h3>
                    <small><Link className='link-dec' to="follower">Followers</Link></small>
                  </div>
                  <div class="col-lg-4 col-md-4 m-t-20">
                    <h3 class="m-b-0 font-light">{userFollower.following}</h3>
                    <small><Link className='link-dec' to="following">Following</Link></small>                                </div>
                  <div class="col-lg-4 col-md-4 m-t-20">
                    <h3 class="m-b-0 font-light">{noOfPost}</h3><small>Posts</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-details shadow-sm">
          <div className="profile-deails-box">
            <span className="profile-details-head">
              Email :
            </span>
            <span className="profile-details-text">
              {userData.email}
            </span>
          </div>
          <div className="profile-deails-box">
            <span className="profile-details-head">
              Phone :
            </span>
            <span className="profile-details-text">
              {userData.phone}
            </span>
          </div>
          <div className="profile-deails-box">
            <span className="profile-details-head">
               About :
            </span>
            <span className="profile-details-text">
              {userData.about}
            </span>
          </div>
          <div className="profile-deails-box">
            <span className="profile-details-head">
              Date of Birth :
            </span>
            <span className="profile-details-text">
              {userData.dob}
            </span>
          </div>
        </div>
        <div className='feed-sec'>
          {userPosts.map((item, index) =>
          (<div key={index} className="feed-post">
            <div class="bg-white border mt-2 ">
              <div>
                <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                  <div class="d-flex flex-row align-items-center feed-text px-2 "><img class="rounded-circle" src={profile_pic} width="45" />
                    <div class="d-flex flex-column feed-t2 flex-wrap ml-4">
                      <div>
                        <Link to={`/profile/${item.username}`} className='link-dec'><span class="font-weight-bold feed-user-name" >{item.name} </span></Link>
                        <span className='font-weight-light'>(@{item.username})</span>
                      </div>
                      <span class="text-black-50 time">{item.postdate}</span></div>
                  </div>

                </div>
              </div>
              <div class={`p-2 px-3 feed-context animate-charcter-${item.context}`}><span>{item.context}</span></div>
              <div class="p-2 px-3 feed-body" ><span>{item.body}</span></div>
              <div class="d-flex justify-space-around socials p-2 py-3">
                <div className="like-no feed-button">
                  <span>{item.likes.length}  <i class="fa-solid fa-heart"></i> </span>
                </div>
                <div className="comment-no feed-button">
                  <span>{item.comment.length}  <i class="fa-solid fa-comment"></i></span>
                </div>
                <div className='feed-button'>
                  <Link to={`/post/${item.postid}`} className="view-button"><i class="fa-solid fa-eye"></i></Link>
                </div>
              </div>
            </div>
          </div>))}
        </div>
      </div>
    </div>
  )
}
export default Profile

