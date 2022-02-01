import React, { Fragment, useState, useEffect, } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'
import { Form } from "react-bootstrap";

import {history} from '../../utils/helper'
import BlockUI from "../../components/BlockUI"
import validateMessageForm from './MessageFormValidation'
import "./message.css";

const Message = (props) => {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const loggedUser = useSelector(state => state.authenticatedUser);
    const { user } = loggedUser;

    const dispatch = useDispatch()

    /* validate form */
    const _validateForm = () => {
        let formFields = fields;
        let response = validateMessageForm(formFields);

        setErrors(response.errors)
        return response.formIsValid;
    }

    /* handle input field changes */
    const _handleChange = (target) => {
        let data = fields;
        data[target.name] = target.value;
        setFields({...data})
    }

    /* submit form */
    const _handleSubmit = (event) => {
        event.preventDefault();
        
        if (_validateForm()) {
            const { password } = event.target;
            const postData = {
                password   : password.value,
                candidateId: user.id
            }

            // dispatch(actionChangeCandidatePassword(postData, user));  // action is called to submit data
        }
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/candidate/dashboard')
    }
    const { blocking } = user

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
                            <form className="form-inline user-form" onSubmit={(event) => _handleSubmit(event)}>
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
                                        <input type="text" name="Subject" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                        value={fields.oldPassword || ''} 
                                                        onChange={(event) => _handleChange(event.target)}
                                                        placeholder="Subject" 
                                                        minLength="6" />
                                        <div className="errorMsg">{errors.oldPassword}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">Message</label>
                                        <textarea style={{minHeight: '150px'}} name="message" className="form-control mb-2 mr-sm-2 col-md-12" id="inlineFormInputName2" 
                                            placeholder="Type Your Message" 
                                            value={fields.message || ''} 
                                            onChange={(event) => _handleChange(event.target)}
                                        >

                                        </textarea>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-gradient-primary mb-2">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )
}

export default Message