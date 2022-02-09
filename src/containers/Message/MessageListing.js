import React, { Fragment } from "react"
import { Link, NavLink } from "react-router-dom"

import BlockUI from "../../components/BlockUI"
import './MessageListing.css';

const MessageListing = () => {
    return (
        <Fragment>
            <BlockUI /> 
            <div className="page-header">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  <h3 className="page-title" style={{fontWeight: '600'}}> Message listing</h3>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-end text-right">
                  <Link to="/messages">
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Compose
                    </button>
                  </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="message-listing">
                                    <div className="listings">
                                        <Link to="#" className="bold-font">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> 
                                    <div className="listings">
                                        <Link to="#" className="bold-font">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div>  
                                    <div className="listings">
                                        <Link to="#">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> 
                                    <div className="listings">
                                        <Link to="#">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> 
                                    <div className="listings">
                                        <Link to="#">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> 
                                    <div className="listings">
                                        <Link to="#">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div>
                                </div>
                                
                                {/* <table className="table msg-listing">
                                    <tbody>
                                        <tr style={{fontWeight: '700'}}>
                                            <Link to="/messages">
                                                <td><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</td>
                                                <td> New Application for frontend developer </td>
                                                <td> 12:22 PM </td>
                                            </Link>
                                        </tr>
                                        <tr style={{fontWeight: '700'}}>
                                            <Link to="/messages">
                                                <td>
                                                    <img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh
                                                </td>
                                                <td> Fund is not recieved </td>
                                                <td> 12:27 PM </td>
                                            </Link>
                                        </tr>
                                        <tr>
                                            <Link to="/messages">
                                                <td>
                                                    <img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh
                                                </td>
                                                <td> Fund is not recieved </td>
                                                <td> 12:27 PM </td>
                                            </Link>
                                        </tr>
                                        <tr>
                                            <Link to="/messages">
                                                <td>
                                                    <img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh
                                                </td>
                                                <td> Fund is not recieved </td>
                                                <td> 12:27 PM </td>
                                            </Link>
                                        </tr>
                                    </tbody>
                                </table> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default MessageListing;