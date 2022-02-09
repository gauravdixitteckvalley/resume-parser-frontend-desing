import React, { Fragment } from "react"

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
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                                    <p className="page-title" style={{fontWeight: '600'}}> New Application for Frontend developer</p>
                                </div>
                                <div className="">

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