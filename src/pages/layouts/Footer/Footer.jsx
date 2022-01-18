import React from 'react';
import  "./footer.css";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container-fluid d-flex justify-content-between">
                    <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">Copyright © Virtual Employee 2022</span>
                    <span className="float-none float-sm-end mt-1 mt-sm-0 text-end"> A Product by <a href="http://www.virtualemployee.co.in/" target="_blank">Virtual Employee</a></span>
                </div>
            </footer>
        </>
    )
}

export default Footer;
