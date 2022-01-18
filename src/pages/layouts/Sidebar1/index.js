import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

import SidebarStyle from './style';

const Sidebar = (props) => {

    /**fetched data from redux store */
    const authenticateUser = useSelector(state => state.authenticatedUser);
    const { user } = authenticateUser

    const showRoutesForAdmin = () => {
        return(
            <>
                <li className="nav-item">
                        <Link to='/dashboard' className="nav-link active">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link to='/user' className="nav-link active">Users</Link>
                </li>
                <li className="nav-item">
                    <Link to='/skills' className="nav-link active">Skills</Link>
                </li>
            </>
        )
    }

    return (
        <div className="col-md-3 col-lg-2 sidebar-offcanvas bg-dark pl-0 sidebar" id="sidebar" role="navigation">
            <SidebarStyle>
                <ul className="nav flex-column sticky-top pl-0 pt-5 mt-3 sidebar">
                    {
                        user.email === 'testing@gmail.com' ?
                        showRoutesForAdmin() : ''
                    }
                    <li className="nav-item">
                        <Link to='/resume/add' className="nav-link active">Add Candidate</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/resume' className="nav-link active">Find Candidate</Link>
                    </li>
                </ul>
            </SidebarStyle>
        </div>
    )
}

export default Sidebar;