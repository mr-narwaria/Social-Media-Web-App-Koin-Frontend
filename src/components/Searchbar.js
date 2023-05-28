import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";




const Searchbar = () => {

    const [uname, setUname] = useState();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout = async () => {
        try {
            const res = await fetch('/logout', {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            const d = await res.json();
            navigate('../home')
        } catch (error) {
            navigate('../home')
        }
    }
    const searchUser = () => {
        if (!uname) {
            window.alert("plzz write username")
        }
        else {
            navigate(`/searchUser/?${uname}`);
        }
    }

    return (
        <>
            <div className="search-bar">
                <form method='GET' className="row g-3">
                    <div class="col-auto" >
                        <input className="form-control " id="uname" name='uname' type="search" placeholder="Enter User Name" aria-label="Search"
                            value={uname}
                            onChange={(e) => setUname(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-outline-success " type="submit" onClick={searchUser}><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </form>
            </div>
            <div className="about">
            </div>
        </>

    )
}

export default Searchbar