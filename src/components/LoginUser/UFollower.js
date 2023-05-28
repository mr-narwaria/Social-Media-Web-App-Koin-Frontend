import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import profile_pic from "../profile.jpg"



const Follower = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getusers = async () => {
        try {

            const res = await fetch('/ufollower', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            if (!res.status === 200) {
                const erro = new Error(res.error);
                throw erro;
            }

            const data = await res.json();
            setUsers(data);

        } catch (error) {
            navigate('/login');

        }
    }

    useEffect(() => {
        getusers();
    }, []);
    return (
        <div className="u-follower">
            <div className="main-head">
                <p className='main-head-text'>Follower</p>
            </div>

            <div className='list'>
                {users.map((item, index) =>
                (<div key={index} className="list-user shadow-sm  bg-body ">
                    <div className="list-profilepic ">
                        <img class="list-profilepic-pic " src={profile_pic} />
                    </div>
                    <div className="list-info">
                        <div >
                            <Link to={`/profile/${item.username}`} className="list-name">{item.name} </Link>
                        </div>
                        <div className="list-username">
                            <p>@{item.username}</p>
                        </div>
                        <div className="list-status">
                            <p>{item.status}</p>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
    )
}

export default Follower