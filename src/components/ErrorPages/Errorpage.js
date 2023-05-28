
import React from 'react'
import { NavLink } from 'react-router-dom'

const Errorpage = () => {
    return (
        <>
            <div id="notFound">
                <h1>404 not found</h1>
            </div>
            <button type="button" class="btn btn-primary"> <NavLink to="/">Back to homage</NavLink></button>
           
        </>
    )
}

export default Errorpage
