import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'
import { Form } from "react-bootstrap";

import ChangePasswordStyle from './changePasswordStyle';
import BlockUI from "../../../components/BlockUI"
import {history} from '../../../utils/helper'
import validateChangePasswordForm from './ChangePasswordFormValidation'
import { actionChangeCandidatePassword } from '../../../actions/Resume'

const ChangePasswordForm = (props) => {
    const candidateId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    /**fetched data from redux store */
    const resumeData = useSelector(state => state.resume);
    const loggedUser = useSelector(state => state.authenticatedUser);
    const { user } = loggedUser;
    const dispatch = useDispatch();

    /* validate form */
    const _validateForm = () => {
        let formFields = fields;
        let response = validateChangePasswordForm(formFields);

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

            dispatch(actionChangeCandidatePassword(postData, user));  // action is called to submit data
        }
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/candidate/dashboard')
    }
    const { blocking } = resumeData
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <ChangePasswordStyle>
            <div className="page-header">
              <h3 className="page-title"> Change Password</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                            <form onSubmit={(event) => _handleSubmit(event)} className="form-inline">
                                        
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="mb-1" for="inlineFormInputName2">Old Password</label>
                                            <input type="password" name="oldPassword" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                        value={fields.oldPassword || ''} 
                                                        onChange={(event) => _handleChange(event.target)} 
                                                        minLength="6" />
                                                <div className="errorMsg">{errors.oldPassword}</div>        
                                    </div>
                                </div> 
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                            <label className="mb-1" for="inlineFormInputName2">Password</label>
                                                <input type="password" name="password" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                            value={fields.password || ''} 
                                                            onChange={(event) => _handleChange(event.target)} 
                                                            minLength="6" />
                                                    <div className="errorMsg">{errors.password}</div>        
                                    </div>       
                                    <div className="col-md-6"> 
                                        <label className="mb-1" for="inlineFormInputName2">Confirm Password</label>
                                        <div className="form-group">
                                            <input type="password" name="confirmPassword" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                    value={fields.confirmPassword || ''} 
                                                    onChange={(event) => _handleChange(event.target)} 
                                                    minLength="6" />
                                            <div className="errorMsg">{errors.confirmPassword}</div>        
                                        </div>
                                    </div>
                                </div>                                        
                          
                    
                                 <button type="submit" className="btn btn-gradient-primary mb-2">Submit</button>
                                 <button className="btn btn-light mb-2" onClick={_handleCancelForm}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>           
            </ChangePasswordStyle>
        </Fragment>
    )
}

export default ChangePasswordForm