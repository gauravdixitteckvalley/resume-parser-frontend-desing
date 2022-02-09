import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import Pagination from "react-js-pagination"

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
                                <div className="pagination justify-content-between mt-4" aria-label="Page navigation example">
                                    <div>Showing 0 to 10 of 50 entries</div>
                                    <Pagination
                                        itemClass="page-item"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        prevPageText=" Previous"
                                        innerClass="pagination justify-content-end"
                                        nextPageText="Next"
                                    /> 
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default MessageListing;