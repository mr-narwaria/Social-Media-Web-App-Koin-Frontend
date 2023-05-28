import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import profile_pic from "./profile.jpg"

const Explore = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getexplore = async () => {
        try {

            const res = await fetch('/getexplore', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
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
        getexplore();
    }, []);
    return (
        <div className="explore">
            <div className="main-head">
                <p className='main-head-text'>Explore</p>
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

export default Explore