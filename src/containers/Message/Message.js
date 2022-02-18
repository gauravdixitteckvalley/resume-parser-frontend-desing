import React, { Fragment, useState, useEffect, } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'
import { Form } from "react-bootstrap";

import {history} from '../../utils/helper'
import BlockUI from "../../components/BlockUI"
import validateMessageForm from './MessageFormValidation'
import "./message.css";
import { messageSend,fetchUserData } from '../../actions/Message';

const Message = (props) => {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const messages = useSelector(state => state.message);
    
    const { blocking, userList } = messages;

    const dispatch = useDispatch()

     /**hook equivalent to componentdidmount lifecycle */
     useEffect(() => {
        _getUserData();

    }, []);
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

    const _getUserData = () =>{
        dispatch(fetchUserData())
    }
    /* submit form */
    const _handleSubmit = (event) => {
        event.preventDefault();
   
        if (_validateForm()) {
            const { subject, message, to } = fields;
            const postData = {
                to   : to,
                subject : subject,
                messageText: message
            }

            dispatch(messageSend(postData));  // action is called to submit data
        }
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/candidate/dashboard')
    }

    return (
        <Fragment>
            <BlockUI blocking={blocking} /> 
            <div className="page-header">
              <h3 className="page-title">New Message</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-inline user-form" onSubmit={(event) => _handleSubmit(event)}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="mb-1 required" for="inlineFormInputName2">To</label>
                                        <select name="to" className="form-control mb-2 mr-sm-2 col-md-6" 
                                        value={fields.to || ''} 
                                        onChange={(event) => _handleChange(event.target)} 
                                        >
                                            <option value="">Select User</option>
                                            {userList?.map((data, index) => (
                                                <option key={index} value={data._id}>{data.first_name +' '+ data.last_name }</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-12 mt-2">
                                        <label className="mb-1 required" for="inlineFormInputName2">Subject</label>
                                        <input type="text" name="subject" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                        value={fields.subject || ''} 
                                                        onChange={(event) => _handleChange(event.target)}
                                                        placeholder="Subject" 
                                                        minLength="6" />
                                        <div className="errorMsg">{errors.subject}</div>
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