import React, { Fragment } from "react"
import _ from 'lodash'
import { Form } from "react-bootstrap";

import BlockUI from "../../components/BlockUI"
import "./message.css";

const Message = (props) => {
    

    return (
        <Fragment>
            <BlockUI />
            <div className="page-header">
              <h3 className="page-title">Send Messages</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-inline user-form">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">Name</label>
                                        <Form.Control as="select" name="name" > 
                                            <option value=''>Select Name</option> 
                                            <option>Sandip Ghosh</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <label className="mb-1 required" for="inlineFormInputName2">Subject</label>
                                        <input type="email" name="email" className="form-control mb-2 mr-sm-2 col-md-6" id="inlineFormInputName2" placeholder="Subject" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">Message</label>
                                        <textarea style={{minHeight: '150px'}} name="message" className="form-control mb-2 mr-sm-2 col-md-12" id="inlineFormInputName2" placeholder="Type Your Message"></textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-gradient-primary mb-2">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default Message