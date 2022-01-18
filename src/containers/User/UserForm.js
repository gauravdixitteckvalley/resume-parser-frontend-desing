import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'
import { Form } from "react-bootstrap";

import BlockUI from "../../components/BlockUI"
import {history} from '../../utils/helper'
import validateUserForm from './UserFormValidation'
import { fetchUserEditFormDependantData, submitUserFormData, resetUserData, fetchUserRolesData,fetchUserByRole } from '../../actions/User'

const UserForm = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [applyCheck] = useState(currentId ? false : true);
    const [roles, setRoles] = useState([]);
    const [usersList, setusersList] = useState({});
    /**fetched data from redux store */
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        if(currentId){
            dispatch(fetchUserEditFormDependantData(currentId)) // action is called to fetch record
        } 
        else{
            dispatch(fetchUserRolesData())
        }  
            
        // returned function will be called on component unmount 
        return () => {
            dispatch(resetUserData())
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    /**section to be executed when we open the form in edit mode */
    if(currentId && typeof userData != "undefined" && (_.size(userData) > 0))
        if (_.size(userData.user) !== _.size(fields))
            setFields({...userData.user})
    /**end of section to be executed when we open the form in edit mode */

    /* validate form */
    const _validateForm = () => {
        let formFields = fields;
        let response = validateUserForm(formFields, applyCheck);

        setErrors(response.errors)
        return response.formIsValid;
    }

    /* handle input field changes */
    const _handleChange = (event) => {
        let data = fields;
        if(event.target.name==="user_role"){
               dispatch(fetchUserByRole(event.target.value));
        }
        data[event.target.name] = event.target.value;
        setFields({...data})
    }

    /* submit form */
    const _handleSubmit = (event) => {
        event.preventDefault();
        
        if (_validateForm()) {
            const {first_name, last_name, email, password, username, user_role, assigned_to} = event.target;
            const postData = {
                first_name  : first_name.value,
                last_name   : last_name.value,
                email       : email.value,
                username    : username.value,
                user_role   : user_role.value,
                assigned_to : assigned_to.value
            }

            if(currentId){
                dispatch(submitUserFormData(currentId,postData));  //action is called to submit data
            } else {
                postData.password = password.value
                dispatch(submitUserFormData('',postData));  // action is called to submit data
            }
        }
    }

    /**method called when form is cancelled */
    const _handleCancelForm = () => {
        history.push('/user')
    }
    const { blocking, user_roles,user_list } = userData
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <h1 className="display-4 d-none d-sm-block">
                User Details
            </h1>
            
            <form onSubmit={(event) => _handleSubmit(event)} className="user-form">
                <div className="row clearfix mb-3">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="row clearfix">
                            <div className="col-md-6 mb-3"> <b className="required">First Name</b>
                                <div className="form-group">
                                    <input type="text" name="first_name" className="form-control" 
                                            value={fields.first_name || ''} 
                                            onChange={(event) => _handleChange(event)} 
                                            minLength="3" />
                                    <div className="errorMsg">{errors.first_name}</div>        
                                </div>
                            </div>

                            <div className="col-md-6 mb-3"> <b className="required">Last Name</b>
                                <div className="form-group">
                                    <input type="text" name="last_name" className="form-control" 
                                            value={fields.last_name || ''} 
                                            onChange={(event) => _handleChange(event)} 
                                            minLength="3" />
                                    <div className="errorMsg">{errors.last_name}</div>        
                                </div>
                            </div>
                            
                            <div className="col-md-6 mb-3"> <b className="required">Username</b>
                                <div className="form-group">
                                    <input type="text" name="username" className="form-control" 
                                            value={fields.username || ''}
                                            onChange={(event) => _handleChange(event)} 
                                            readOnly={currentId}
                                            minLength="3" />
                                    <div className="errorMsg">{errors.username}</div>
                                </div>
                            </div>
                            
                            <div className="col-md-6 mb-3"> <b className="required">Email</b>
                                <div className="form-group">
                                    <input type="email" name="email" className="form-control" 
                                            value={fields.email || ''}
                                            onChange={(event) => _handleChange(event)} 
                                            readOnly={currentId}
                                            />
                                    <div className="errorMsg">{errors.email}</div>        
                                </div>
                            </div>

                            {!currentId ? 
                                <>
                                    <div className="col-md-6 mb-3"> <b className="required">Password</b>
                                        <div className="form-group">
                                            <input type="password" name="password" className="form-control"  
                                                    value={fields.password || ''} 
                                                    onChange={(event) => _handleChange(event)} 
                                                    minLength="6" />
                                            <div className="errorMsg">{errors.password}</div>        
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3"> <b className="required">Confirm Password</b>
                                        <div className="form-group">
                                            <input type="password" name="confirm_password" className="form-control"  
                                                    value={fields.confirm_password || ''} 
                                                    onChange={(event) => _handleChange(event)} 
                                                    minLength="6" />
                                            <div className="errorMsg">{errors.confirm_password}</div>        
                                        </div>
                                    </div>
                                </> 
                            : ''} 
                            {(user_roles) && user_roles.length > 0 ?
                            <div className="col-md-6 mb-3"> <b className="required">User Role</b>
                                <div className="form-group">
                                <Form.Control as="select" name="user_role" value={fields.user_role || ''} onChange={(event) => _handleChange(event)}>
                                    <option value="">Select Role</option>
                                    {user_roles.map((role, index) => (
                                        <option key={index} value={role._id}>{role.name}</option>
                                    ))}
                                </Form.Control>
                                <div className="errorMsg">{errors.user_role}</div> 
                                </div>
                            </div> : ''}                                          
                            { ((user_list) && user_list.length > 0) ?
                            <div className="col-md-6 mb-3"> <b className="required">Assign To</b>
                                <div className="form-group">
                                  <Form.Control as="select" name="assigned_to" value={fields.assigned_to || ''} onChange={(event) => _handleChange(event)}>
                                    <option value="">Choose Option</option>
                                    {user_list.map((assigned, index) => (
                                        <option key={index} value={assigned.id}>{ (assigned.name).charAt(0).toUpperCase() + (assigned.name).slice(1) }</option>
                                    ))}
                                </Form.Control> 
                                
                                <div className="errorMsg">{errors.assigned_to}</div> 
                                </div>
                            </div>
                            :''  }

                            {(currentId && !user_list) ?
                               <div className="col-md-6 mb-3"> <b className="required">Assign To</b>
                                     <Form.Control as="select" name="assigned_to" value={fields.assigned_to || ''} onChange={(event) => _handleChange(event)}>
                                        <option value={fields.assigned_to}>{fields.assigned_name}</option>
                                     </Form.Control>      
                                </div>
                            : '' }  
                       
                       
                        </div>
                    </div>
                </div>
                    
                <button type="submit" className="btn btn-success">Submit</button>
                <button className="btn btn-danger ms-2" onClick={_handleCancelForm}>Cancel</button>
            </form>
        </Fragment>
    )
}

export default UserForm