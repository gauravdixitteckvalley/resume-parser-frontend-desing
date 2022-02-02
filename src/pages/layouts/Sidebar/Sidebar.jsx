import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import siderbarMenu from './siderbarMenu';
import { useLocation } from "react-router-dom";
import "./sidebar.css";
import { IMAGE_URL } from '../../../utils/helper'


const Sidebar = () => {
    
    /**fetched data from redux store */
    const authenticateUser = useSelector(state => state.authenticatedUser);
    //console.log(authenticateUser,' authenticateUser')
    const { user } = authenticateUser;

    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;
    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");


    const showRoutesForAdmin = () => {
        return(
            <>
                <li  className={splitLocation[1] === "user" ? "active nav-item" : "nav-item "}>
                    <Link to='/user' className="nav-link">
                        <span className="menu-title">Users</span>
                        <i className="mdi mdi-contacts menu-icon"></i>
                    </Link>
                </li>
                <li  className={splitLocation[1] === "skills" ? "active nav-item" : "nav-item "}>
                    <Link to='/skills' className="nav-link">
                        <span className="menu-title">Skills</span>
                        <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                    </Link>
                </li>
            </>
        )
    }

    // Manage links to handle candidate admin and other's login
    const _manageSideMenus = (user) => {
        if(user.isCandidateLogin){
            return (
                <>
                    <li  className={splitLocation[1] === "dashboard" ? "active nav-item" : "nav-item "}>
                        <Link to='/candidate/dashboard' className="nav-link">
                            <span className="menu-title">Dashboard</span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </Link>
                    </li>
                    <li  className={splitLocation[1] === "profile" ? "active nav-item" : "nav-item "}>
                        <Link to={`/candidate/view/${user.id}`} className="nav-link">
                            <span className="menu-title">Profile</span>
                            <i className="mdi mdi-contacts menu-icon"></i>
                        </Link>
                    </li>
                </>
            )
        }else{
            return (
                <>
                 <li  className={splitLocation[1] === "dashboard" ? "active nav-item" : "nav-item "}>
                        <Link to='/dashboard' className="nav-link">
                            <span className="menu-title">Dashboard</span>
                            <i className="mdi mdi-home menu-icon"></i>
                        </Link>
                    </li> 
                    {
                        user.role_id === '1' ?
                        showRoutesForAdmin() : ''
                    }
                     
                    <li  className={splitLocation[2] === "add" ? "active nav-item" : "nav-item "}>
                        <Link to='/resume/add' className="nav-link">
                            <span className="menu-title">Add Candidate</span>
                            <i className="mdi mdi-account-plus menu-icon"></i>
                        </Link>
                    </li>
                    <li  className={splitLocation[1] ==="resume" && splitLocation[2] !== "add" ? "active nav-item" : "nav-item "}>
                        <Link to='/resume' className="nav-link">
                            <span className="menu-title">Find Candidate</span>
                            <i className="mdi mdi-account-search menu-icon"></i>
                        </Link>
                    </li>
                    <li  className={splitLocation[1] ==="messages" && splitLocation[2] !== "add" ? "active nav-item" : "nav-item "}>
                    <Link to='/messages' className="nav-link">
                        <span className="menu-title">Message</span>
                        <i className="mdi mdi-message-reply menu-icon"></i>
                    </Link>
                    </li>
                </>
            )
        }
        
    }

    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item nav-profile">
                        <Link to={user.isCandidateLogin ? `/candidate/view/${user.id}` : "/profile"} className="nav-link">
                            <div className="nav-profile-image">
                                <img src={authenticateUser.user.profile_image ? IMAGE_URL+authenticateUser.user.profile_image : "/assets/img/user_icon.png"} alt="profile" />
                                <span className="login-status online"></span>
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                                <span className="font-weight-bold mb-2">{authenticateUser.user.full_name}</span>
                                <span className="text-secondary text-small">{authenticateUser.user.user_role_name}</span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </Link>
                    </li>
                    { _manageSideMenus(user) }
                     
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;
