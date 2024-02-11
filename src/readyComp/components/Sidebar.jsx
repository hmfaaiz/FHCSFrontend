import {React,useState} from 'react'
import "../css/style.css"
import RegisterDriver from "./registerDriver/RegisterDriver"
import RegisterAmbulance from "./registerAmbulance/RegisterAmbulance"
import AddShift from "./addShift/AddShift"
import Dashboard from "./dashboard/Dashboard"
import Toggle from "./Toggle"
import Footer from "./Footer"
import Nav from "./Nav"

const Sidebar = () => {
const [openRegisterDriver,setOpenRegisterDriver]=useState(false)
const [openRegisterAmbulance,setopenRegisterAmbulance]=useState(false)
const [openAddShift,setopenAddShift]=useState(false)
const [openDashboard,setopenDashboard]=useState(true)



const HandlerOpenDashboard=()=>{
    setOpenRegisterDriver(false)
    setopenRegisterAmbulance(false)
    setopenAddShift(false)
    setopenDashboard(true)
}
const HandlerRegisterDriver=()=>{
    setOpenRegisterDriver(true)
    setopenRegisterAmbulance(false)
    setopenAddShift(false)
    setopenDashboard(false)
}
const HandleropenRegisterAmbulance=()=>{
    setopenRegisterAmbulance(true)
    setOpenRegisterDriver(false)
    setopenAddShift(false)
    setopenDashboard(false)
}
const HandleropenAddShift=()=>{
    console.log('shidt click')
    setopenRegisterAmbulance(false)
    setOpenRegisterDriver(false)
    setopenAddShift(true)
    setopenDashboard(false)
}
    return (
        <div className="wrapper">
            <aside id="sidebar" className="js-sidebar">

                <div className="h-100">
                    <div className="sidebar-logo">
                        <a href="#" onClick={HandlerOpenDashboard}>Health Care Sol.</a>
                    </div>
                    <ul className="sidebar-nav">
                        <li className="sidebar-header">
                            Admin Elements
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={HandleropenRegisterAmbulance}>
                                <i className="fa-solid fa-list pe-2"></i>
                                Ambulance
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={HandlerRegisterDriver}>
                                <i className="fa-solid fa-list pe-2"></i>
                                Driver
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link" onClick={HandleropenAddShift}>
                                <i className="fa-solid fa-list pe-2"></i>
                                Shift
                            </a>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse"
                                aria-expanded="false"><i className="fa-solid fa-file-lines pe-2"></i>
                                User
                            </a>
                            <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Active User</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Patient</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse"
                                aria-expanded="false"><i className="fa-solid fa-sliders pe-2"></i>
                                Posts
                            </a>
                            <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Post 1</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Post 2</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Post 3</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-target="#auth" data-bs-toggle="collapse"
                                aria-expanded="false"><i className="fa-regular fa-user pe-2"></i>
                                My Profile
                            </a>
                            <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Update</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Register</a>
                                </li>
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link">Forgot Password</a>
                                </li>
                            </ul>
                        </li>
                        <li className="sidebar-header">
                            Multi Level Menu
                        </li>
                        <li className="sidebar-item">
                            <a href="#" className="sidebar-link collapsed" data-bs-target="#multi" data-bs-toggle="collapse"
                                aria-expanded="false"><i className="fa-solid fa-share-nodes pe-2"></i>
                                Multi Dropdown
                            </a>
                            <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                                <li className="sidebar-item">
                                    <a href="#" className="sidebar-link collapsed" data-bs-target="#level-1"
                                        data-bs-toggle="collapse" aria-expanded="false">Level 1</a>
                                    <ul id="level-1" className="sidebar-dropdown list-unstyled collapse">
                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link">Level 1.1</a>
                                        </li>
                                        <li className="sidebar-item">
                                            <a href="#" className="sidebar-link">Level 1.2</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="main">
            <Nav />
            {openRegisterDriver && <RegisterDriver handleButtonClick={HandlerRegisterDriver} />} 
            {openRegisterAmbulance && <RegisterAmbulance handleButtonClick={HandleropenRegisterAmbulance} />} 
          
            {openAddShift && <AddShift handleButtonClick={HandleropenAddShift} />} 
            {openDashboard && <Dashboard handleButtonClick={HandleropenAddShift} />} 
           
        

            {/* <Toggle /> */}
            <Footer />
        </div>
        </div>
    )
}

export default Sidebar
