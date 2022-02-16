import React, { Fragment } from "react"

import BlockUI from "../../components/BlockUI";

const Notice = () => {
    const blocking = false;
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="page-title font-style-bold mb-4">
                            Notices & Events
                            </h4>
                            <hr className="mb-4" />
                            <form className="form-inline edit-form">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">Select User</label>
                                        <select name="to" className="form-control mb-2 mr-sm-2 col-md-6">
                                            <option>Select User</option>
                                            <option>All</option>
                                            <option>Test1</option>
                                            <option>Test2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">Description</label>
                                        <textarea style={{minHeight: '150px'}} name="message" className="form-control mb-2 mr-sm-2 col-md-12" id="inlineFormInputName2" placeholder="Type Your Message" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-gradient-primary mt-2 mb-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Notice