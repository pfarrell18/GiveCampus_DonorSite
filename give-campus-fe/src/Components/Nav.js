import React from "react"
import { Link } from "react-router-dom"

const Nav = () => {

    return (
        <React.Fragment>
            <nav className="navbar is-light">
                <div className="navbar-start">
                    <img src="https://go.givecampus.com/wp-content/uploads/2019/09/GiveCampus-logo.png" alt="gc-logo" className="gc-logo" />
                </div>
                    <Link className="navbar-item" to="/donate">Donate</Link>
                    <Link className="navbar-item" to="/pledge">Pledge</Link>
                    <Link className="navbar-item" to="/schoolpledge">School Pledges</Link>
            </nav>
        </React.Fragment>
    )
}


export default Nav