import React from 'react'
import "../css/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import profile from "../image/profile.jpg"
const Nav = () => {
    return (

        <nav className="navbar navbar-expand px-3 border-bottom">
            <button className="btn" id="sidebar-toggle" type="button">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse navbar">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                            <img src={profile} className="avatar rounded" alt="" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a href="#" className="dropdown-item">Profile</a>
                            <a href="#" className="dropdown-item">Setting</a>
                            <a href="#" className="dropdown-item">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>

    )
}

export default Nav
