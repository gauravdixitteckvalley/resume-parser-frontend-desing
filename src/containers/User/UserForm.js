import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'
import { Form } from "react-bootstrap";

import UserStyle from './style';
import BlockUI from "../../components/BlockUI"
import {history} from '../../utils/helper'
import validateUserForm from './UserFormValidation'
import { fetchUserEditFormDependantData, submitUserFormData, resetUserData, fetchUserRolesData,fetchUserByRole } from '../../actions/User'

const UserForm = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [applyCheck] = useState(currentId ? false : true);
    
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
            const is_del = 0;
            const {first_name, last_name, email, password, username, user_role, assigned_to} = event.target;
            const postData = {
                first_name  : first_name.value,
                last_name   : last_name.value,
                email       : email.value,
                username    : username.value,
                user_role   : user_role.value,
                assigned_to : assigned_to.value,
                is_deleted  : is_del
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
            <UserStyle>
            <div className="page-header">
              <h3 className="page-title"> User Details</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                          <form onSubmit={(event) => _handleSubmit(event)} className="form-inline">
                       
                                    <div className="row">
                                        <div className="col-md-6">
                                        <label className="mb-1" for="inlineFormInputName2">First Name</label>
                                                <input type="text" name="first_name" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.first_name || ''} 
                                                        onChange={(event) => _handleChange(event)} 
                                                        minLength="3" />
                                                <div className="errorMsg">{errors.first_name}</div>        
                                         
                                        </div>

                                        <div className="col-md-6"> 
                                         <label className="mb-1" for="inlineFormInputName2">Last Name</label>
                                          <input type="text" name="last_name" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.last_name || ''} 
                                                        onChange={(event) => _handleChange(event)} 
                                                        minLength="3" />
                                                <div className="errorMsg">{errors.last_name}</div>        
                                        </div>
                                        </div>
                                        
                                        <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label className="mb-1" for="inlineFormInputName2">Username</label>
                                               <input type="text" name="username" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.username || ''}
                                                        onChange={(event) => _handleChange(event)} 
                                                        readOnly={currentId}
                                                        minLength="3" />
                                                <div className="errorMsg">{errors.username}</div>
                                        </div>
                                        
                                        <div className="col-md-6"> 
                                        <label className="mb-1" for="inlineFormInputName2">Email</label>
                                                <input type="email" name="email" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.email || ''}
                                                        onChange={(event) => _handleChange(event)} 
                                                        readOnly={currentId}
                                                        />
                                                <div className="errorMsg">{errors.email}</div>        
                                            
                                          </div>
                                        </div>
                                        {!currentId ? 
                                            <div className="row mt-2">
                                               <div className="col-md-6">
                                                        <label className="mb-1" for="inlineFormInputName2">Password</label>
                                                            <input type="password" name="password" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                                        value={fields.password || ''} 
                                                                        onChange={(event) => _handleChange(event)} 
                                                                        minLength="6" />
                                                                <div className="errorMsg">{errors.password}</div>        
                                                </div>       
                                                <div className="col-md-6"> 
                                                 <label className="mb-1" for="inlineFormInputName2">Confirm Password</label>
                                                    <div className="form-group">
                                                        <input type="password" name="confirm_password" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                                value={fields.confirm_password || ''} 
                                                                onChange={(event) => _handleChange(event)} 
                                                                minLength="6" />
                                                        <div className="errorMsg">{errors.confirm_password}</div>        
                                                    </div>
                                                </div>
                                            </div>
                                        : ''} 
                                        {(user_roles) && user_roles.length > 0 ?
                                     <div className="row mt-2 mb-4">
                                         <div className="col-md-6">
                                         <label className="mb-1" for="inlineFormInputName2">User Role</label>
                                            <Form.Control className="form-control form-control-md" as="select" name="user_role" value={fields.user_role || ''} onChange={(event) => _handleChange(event)}>
                                                <option value="">Select Role</option>
                                                {user_roles.map((role, index) => (
                                                    <option key={index} value={role._id}>{role.name}</option>
                                                ))}
                                            </Form.Control>
                                            <div className="errorMsg">{errors.user_role}</div> 
                                            </div>
                                      
                                            { ((user_list) && user_list.length > 0) ?
                                        <div className="col-md-6"> 
                                        <label className="mb-1" for="inlineFormInputName2">Assign To</label>
                                            <Form.Control className="form-control form-control-md" as="select" name="assigned_to" value={fields.assigned_to || ''} onChange={(event) => _handleChange(event)}>
                                                <option value="">Choose Option</option>
                                                {user_list.map((assigned, index) => (
                                                    <option key={index} value={assigned.id}>{ (assigned.name).charAt(0).toUpperCase() + (assigned.name).slice(1) }</option>
                                                ))}
                                            </Form.Control> 
                                            
                                            <div className="errorMsg">{errors.assigned_to}</div> 
                                            
                                        </div>
                                        :''  }

                                        {(currentId && !user_list) ?
                                        <div className="col-md-6"> 
                                        <label className="mb-1" for="inlineFormInputName2">Assign To</label>
                                                <Form.Control className="form-control form-control-md" as="select" name="assigned_to" value={fields.assigned_to || ''} onChange={(event) => _handleChange(event)}>
                                                    <option value={fields.assigned_to}>{fields.assigned_name}</option>
                                                </Form.Control>      
                                            </div>
                                        : '' }   
                                        </div> : ''}                                          
                          
                    
                                 <button type="submit" className="btn btn-gradient-primary mb-2">Submit</button>
                                 <button className="btn btn-light mb-2" onClick={_handleCancelForm}>Cancel</button>
                         </form>
                       </div>
                    </div>
                </div>
            </div>           
            </UserStyle>
        </Fragment>
    )
}

export default UserForm