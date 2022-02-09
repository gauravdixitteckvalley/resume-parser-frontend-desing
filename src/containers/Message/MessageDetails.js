import React, { Fragment } from "react"
import { Link } from "react-router-dom"

import BlockUI from "../../components/BlockUI"

const MessageDetails = () => {
    return (
        <Fragment>
            <BlockUI /> 
            <div className="page-header">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  <h3 className="page-title" style={{fontWeight: '600'}}> Message Details</h3>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-3">
                                    <p className="page-title" style={{fontWeight: '600'}}> New Application for Frontend developer</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" style={{width: '40px'}} /> Sandip Ghosh</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 mb-2">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2text-right">
                                    <Link to="#">
                                        <button type="button" className="btn btn-gradient-primary btn-fw mb-2">Reply</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default MessageDetails;