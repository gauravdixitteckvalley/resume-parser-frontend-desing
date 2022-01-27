import React from 'react';
import  "./footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid d-flex justify-content-between">
                    <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright © Virtual Employee 2022</span>
                    <span className="float-none float-sm-end mt-1 mt-sm-0 text-end"> A Product by <Link to="http://www.virtualemployee.co.in/" target="_blank">Virtual Employee</Link></span>
                </div>
            </footer>
        </>
    )
}

export default Footer;
