import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import siderbarMenu from './siderbarMenu';
import "./sidebar.css";


const Sidebar = () => {
    
    /**fetched data from redux store */
    const authenticateUser = useSelector(state => state.authenticatedUser);
    const { user } = authenticateUser;


    const showRoutesForAdmin = () => {
        return(
            <>
                <li className="nav-item">
                    <Link to='/dashboard' className="nav-link active">
                        <span className="menu-title">Dashboard</span>
                        <i className="mdi mdi-home menu-icon"></i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/user' className="nav-link active">
                        <span className="menu-title">Users</span>
                        <i className="mdi mdi-contacts menu-icon"></i>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/skills' className="nav-link active">
                        <span className="menu-title">Skills</span>
                        <i className="mdi mdi-format-list-bulleted menu-icon"></i>
                    </Link>
                </li>
            </>
        )
    }

    return (
        <>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <li className="nav-item nav-profile">
                        <a href="#" className="nav-link">
                            <div className="nav-profile-image">
                            <img src="../../assets/img/faces/face1.jpg" alt="profile" />
                            <span className="login-status online"></span>
                            </div>
                            <div className="nav-profile-text d-flex flex-column">
                            <span className="font-weight-bold mb-2">Sandip Ghosh</span>
                            <span className="text-secondary text-small">Team Lead</span>
                            </div>
                            <i className="mdi mdi-bookmark-check text-success nav-profile-badge"></i>
                        </a>
                    </li>
                    {
                        user.email === 'testing@gmail.com' ?
                        showRoutesForAdmin() : ''
                    }
                    <li className="nav-item">
                    <Link to='/resume/add' className="nav-link active">
                        <span className="menu-title">Add Candidate</span>
                        <i className="mdi mdi-account-plus menu-icon"></i>
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/resume' className="nav-link active">
                        <span className="menu-title">Find Candidate</span>
                        <i className="mdi mdi-account-search menu-icon"></i>
                    </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;
