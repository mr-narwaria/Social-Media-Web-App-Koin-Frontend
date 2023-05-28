import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./components/Home/Home";
import Login from "./components/SignupLogin/Login";
import SignUp from "./components/SignupLogin/Signup";
import Profile from "./components/User/Profile";
import Uprofile from "./components/LoginUser/UProfile"
import Follower from "./components/User/Follower"
import Following from './components/User/Following';
import Logout from "./components/SignupLogin/Logout"
import ViewPost from './components/Post/ViewPost';
import "./App.css";
import Errorpage from './components/ErrorPages/Errorpage';
import SearchPage from './components/SearchPage';
import UFollower from './components/LoginUser/UFollower'
import UFollowing from './components/LoginUser/UFollowing'
import Explore from './components/Explore';
import Searchbar from './components/Searchbar';
import Setting from './components/Setting/Setting'
import ChangePass from './components/Setting/ChangePass'
import UpdateProfile from './components/Setting/UpdateProfile';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {


  return (
    <Router>
      <div className="page">
        <div className="st-nav">
          <Navbar />
          <div className={`bottom `}>
            <Logout />
          </div>
          <div className={`bottom `}>
            <button type="button" class="btn btn-outline-success"><Link to="/login">Login</Link></button>
          </div>
        </div>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Uprofile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path='/explore' element={<Explore />} />
            <Route path="/profile/:username/follower" element={<Follower />} />
            <Route path="/profile/:username/following" element={<Following />} />
            <Route path='profile/follower' element={<UFollower />} />
            <Route path='profile/following' element={<UFollowing />} />
            <Route path='/post/:postid' element={<ViewPost />} />
            <Route path='/searchUser' element={<SearchPage />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/setting' element={<Setting />} />
            <Route path='/changepassword' element={<ChangePass />} />
            <Route path='/editprofile' element={<UpdateProfile />} />
            <Route path='*' exact={true} element={<Errorpage />} />
          </Routes>
        </div>
        <div className="right-sec">
          <Searchbar />
        </div>
      </div>
    </Router>

  )
}

export default App

