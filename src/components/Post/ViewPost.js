import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import profile_pic from "../profile.jpg"

const ViewPost = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [logUser, setLogUser] = useState({});
    const [like, setLike] = useState("vw-like-unlike-button");
    const [unlike, setUnLike] = useState("hide");
    const [post, setPost] = useState({});
    const [commList, setCommList] = useState([]);
    const [noOfLikes, setNoOfLikes] = useState(0);
    const [commBody, setCommBody] = useState();

    const handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    };

    const getPost = async () => {
        try {
            const postid = params.postid;
            const res1 = await fetch(`/post/${postid}`, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            })

            if (res1.status === 405) {
                const error = new Error({ code: 405 });
                throw error
            }

            const data1 = await res1.json();
            const cList1 = data1.comment
            setPost(data1);
            const cList2 = [...cList1].sort((a, b) =>
                new Date(b.postdate) - new Date(a.postdate)
            )
            setCommList(cList2);
            var a = data1.likes.length;
            setNoOfLikes(a);

            const res2 = await fetch("/authenticate", {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })

            const data2 = await res2.json();
            setLogUser(data2);
            if (!res2.status === 200) {

            }

            else {
                const ob = { username: data2.username };
                const b = isObjInArray(data1.likes, ob);
                if (b) {
                    setLike("hide");
                    setUnLike("vw-like-unlike-button")
                }
                else {
                    setUnLike("hide");
                    setLike("vw-like-unlike-button")
                }
            }

        } catch (error) {
            if (error.code === 401) {
                navigate('/login')
            }
        }
    }

    const addComment = async (e) => {
        e.preventDefault();
        const postid = params.postid;
        const res = await fetch('/addcomment', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                commBody, postid
            })
        })
        const d = await res.json();
        if (res.status === 200){

            setCommList(d.comment);
            setCommBody("");
            var form=document.getElementById("commpost")
            form.reset()
        }
        else if(res.status===401){
            window.alert("Please login to comment")
            navigate('/login');
        }
        else if(res.status=402){
            window.alert("can't post empty comment")

        }
        
    }



    const likePost = async () => {
        try {
            const postid = params.postid;

            const res = await fetch('/addlike', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"

                },
                credentials: "include",
                body: JSON.stringify({
                    postid: postid
                })
            })

            const data = await res.json();
            if (!res.status === 200) {
                const error = new Error(data.error);
                throw error;
            }
            setLike("hide");
            setUnLike("vw-like-unlike-button")
            const nLikes = noOfLikes + 1;
            setNoOfLikes(nLikes);

        } catch (error) {
            navigate('/login');
        }

    }
    const unLikePost = async () => {
        try {
            const postid = params.postid;
            const res = await fetch('/removelike', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"

                },
                credentials: "include",
                body: JSON.stringify({
                    postid: postid
                })
            })
            const data = await res.json();
            if (!res.status === 200) {
                const error = new Error(data.error);
                throw error;
            }
            setUnLike("hide");
            setLike("vw-like-unlike-button")
            const nLikes = noOfLikes - 1;
            setNoOfLikes(nLikes);

        } catch (error) {
            window.alert("some error occured please reload");
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <div className="main-head">
                <p className='main-head-text'>Post</p>
            </div>

            <div class="bg-white  mt-2 vw-post shadow  bg-body ">
                <div >
                    <div class="d-flex flex-row justify-content-between align-items-center p-2 border-bottom">
                        <div class="d-flex flex-row align-items-center feed-text px-2 "><img class="rounded-circle" src={profile_pic} width="45" />
                            <div class="d-flex flex-column feed-t2 flex-wrap ml-4">
                                <div>
                                    <Link to={`/profile/${post.username}`} className='link-dec'><span class="font-weight-bold feed-user-name" >{post.name} </span></Link>
                                    <span className='font-weight-light'>(@{post.username})</span>
                                </div>
                                <span class="text-black-50 time">{post.postdate}</span></div>
                        </div>
                    </div>
                </div>
                <div class={`p-2 px-3 feed-context animate-charcter-${post.context}`}><span>{post.context}</span></div>
                <div class="p-2 px-3 feed-body" ><span>{post.body}</span></div>
                <div class="d-flex socials-vw p-2 py-3">
                    <div className={`like-no feed-button  ${like}`}>
                        <span>{noOfLikes}<button onClick={likePost} className={like} ><i class={'fa-regular fa-heart'}></i></button></span>
                    </div>
                    <div className={`like-no feed-button  ${unlike}`}>
                        <span>{noOfLikes}<button onClick={unLikePost} className={unlike}><i class={'fa-solid fa-heart'}></i></button></span>
                    </div>
                    <div className="comment-no feed-button">
                        <span> <i class="fa-solid fa-comment"></i></span>
                    </div>
                </div>
            </div>
            <div className="vw-comm-sec ">
                <div className="vw-comm-text">
                    <p>Comments</p>
                </div>
                <div className="vw-comments">
                    {commList.map((item, index) => (
                        <div key={index} className="vw-comm">
                            <div className="vw-comm-username">
                                <Link to={`/profile/${item.username}`} className='vw-comm-username-text'>
                                    <span >@{item.username}</span>
                                </Link>
                            </div>
                            <div className="vw-comm-body">
                                <p>{item.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div >
                    <form method='POST' className="vw-add-comments" id='commpost'>
                        <div class="vw-comm-form">
                            <input type="text" className="vw-comm-form-in" id="commBody" name='commBody' autoComplete='off'
                                placeholder='Add a comment . . .'
                                value={commBody}
                                onChange={(e) => setCommBody(e.target.value)}
                            />
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary mb-3" name='addComment' id='addComment' onClick={addComment}>Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}


function isObjInArray(arr, obj) {
    var b = false;
    var i = 0;
    for (; i < arr.length && !b; i++) {
        if (arr[i].username === obj.username) {
            b = true;
        }
    }
    return b;
}


export default ViewPost


