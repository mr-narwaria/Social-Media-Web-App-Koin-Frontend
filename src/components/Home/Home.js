import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import profile_pic from "../profile.jpg"

const Home = () => {
  const navigate = useNavigate();
  const [body, setBody] = useState('')
  const [context, setContext] = useState('')
  const [feedPosts, setFeedPosts] = useState([]);

  const callFeed = async () => {
    try {

      const res = await fetch("https://koinnn-backend.onrender.com/getfeed", {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }

      const data = await res.json();
      const data2 = [...data].sort((a, b) =>
        new Date(b.postdate) - new Date(a.postdate)
      )
      setFeedPosts(data2);

    } catch (error) {
      navigate('/login')

    }

  }


  const uploadpost = async (e) => {
    e.preventDefault();
    const res = await fetch('https://koinnn-backend.onrender.com/uploadpost', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        body, context
      })
    })
    const d=await res.json();
    if (res.status === 200) {
      setBody("");
      setContext("");
      document.getElementById("post-box").reset();
      callFeed();
    }
    else if(res.status===402){
      window.alert("plzz fill all details")
    }
    else{
      window.alert("somme error in database")
    }

  }
  useEffect(() => {
    callFeed();
  }, []);

  return (
    <div>
      <div className="main-head">
        <p className='main-head-text'>Home </p>
      </div>
      <form method='POST' id='post-box'>
        <div className="upost-form">
          <div className="upost-body">
            <input type="text" className="upost-body-in" id="body" name='body' autoComplete='off'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write new post here . . . . ."
            />
          </div>
          <div className="upost-below">
            <div class="form-group col-md-4 upost-context">
              <select id="context" class="form-control upost-context-in" name='context'
                value={context}
                onChange={(e) => setContext(e.target.value)}>
                <option value="none" selected >Please select context</option>
                <option>Recruitment</option>
                <option>Notice</option>
                <option>Help</option>
                <option>LostandFound</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" name='uploadpost' id='uploadpost' onClick={uploadpost}>Post</button>
          </div>
        </div>
        <hr />
      </form >

      <div className='feed-sec'>
        {feedPosts.map((item, index) =>
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
            <div class={`p-2 px-3 feed-context animate-charcter-${item.context} `}><span>{item.context}</span></div>
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
  )
}

export default Home