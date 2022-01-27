import React, { useState, useEffect, Fragment } from "react"
import { useSelector, useDispatch } from "react-redux"
import _ from 'lodash'
import { Form } from "react-bootstrap";

import UserStyle from './style';
import BlockUI from "../../components/BlockUI"
import {history} from '../../utils/helper'
import validateProfileForm from './ProfileFormValidation'
import { fetchUserEditFormDependantData, submitUserFormData, resetUserData, fetchUserRolesData,fetchUserByRole } from '../../actions/User'

const ProfileForm = (props) => {
    const currentId = props?.match?.params?.id;
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [applyCheck] = useState(currentId ? false : true);
    const [roles, setRoles] = useState([]);
    const [usersList, setusersList] = useState({});
    /**fetched data from redux store */
    const userData = useSelector(state => state.authenticatedUser);
    const dispatch = useDispatch();
    const [file, setFile] =  useState({})

    console.log("authenticateUser ", userData );
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        if(userData.id){
            dispatch(fetchUserEditFormDependantData(userData.id)) // action is called to fetch record
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
        let response = validateProfileForm(formFields, applyCheck);

        setErrors(response.errors)
        return response.formIsValid;
    }

    /* handle input field changes */
    const _handleChange = (event) => {
        let data = fields;
        console.log('event.target.name ', event.target.name)
        if(event.target.name==="user_role"){
               dispatch(fetchUserByRole(event.target.value));
        }
        if(event.target.name==="profile_image"){
            console.log(event, " event ")
            console.log(event.target.value, " event.target.files ")
        }
        data[event.target.name] = event.target.value;
        setFields({...data})
    }

    /* submit form */
    const _handleSubmit = (event) => {
        event.preventDefault();
        
        if (_validateForm()) {
            const {first_name, last_name, email, password, username, user_role} = event.target;
            const postData = {
                first_name  : first_name.value,
                last_name   : last_name.value,
                email       : email.value,
                username    : username.value,
                user_role   : user_role.value,
            }

            if(userData.id){
                dispatch(submitUserFormData(userData.id,postData));  //action is called to submit data
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
            <div class="page-header">
              <h3 class="page-title"> Edit Profile</h3>
            </div>
            <div class="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                      <div class="card-body">
                          <form onSubmit={(event) => _handleSubmit(event)} className="form-inline">
                       
                                    <div className="row">
                                        <div className="col-md-6">
                                        <label class="mb-1" for="inlineFormInputName2">First Name</label>
                                                <input type="text" name="first_name" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.first_name || ''} 
                                                        onChange={(event) => _handleChange(event)} 
                                                        minLength="3" />
                                                <div className="errorMsg">{errors.first_name}</div>        
                                         
                                        </div>

                                        <div className="col-md-6"> 
                                         <label class="mb-1" for="inlineFormInputName2">Last Name</label>
                                          <input type="text" name="last_name" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.last_name || ''} 
                                                        onChange={(event) => _handleChange(event)} 
                                                        minLength="3" />
                                                <div className="errorMsg">{errors.last_name}</div>        
                                        </div>
                                        </div>
                                        
                                        <div className="row mt-2">
                                        <div class="col-md-6">
                                            <label class="mb-1" for="inlineFormInputName2">Username</label>
                                               <input type="text" name="username" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.username || ''}
                                                        onChange={(event) => _handleChange(event)} 
                                                        minLength="3" />
                                                <div className="errorMsg">{errors.username}</div>
                                        </div>
                                        
                                        <div className="col-md-6"> 
                                        <label class="mb-1" for="inlineFormInputName2">Email</label>
                                                <input type="email" name="email" className="form-control mb-2 mr-sm-2 col-md-6" 
                                                        value={fields.email || ''}
                                                        onChange={(event) => _handleChange(event)} 
                                                        />
                                                <div className="errorMsg">{errors.email}</div>        
                                            
                                          </div>
                                        </div>
                                       
                                            <div class="row mt-2">
                                               <div class="col-md-6">
                                                        <label class="mb-1" for="inlineFormInputName2">Profile Image</label>
                                                            <input type="file" name="profile_image" className="form-control mb-2 mr-sm-2 col-md-6"  
                                                                        value={fields.password || ''} 
                                                                        onChange={(event) => _handleChange(event)} 
                                                                        minLength="6" />
                                                                <div className="errorMsg">{errors.password}</div>        
                                                </div>       
                                                <div className="col-md-6"> 
                                                    
                                                </div>
                                            </div>                           
                          
                    
                                 <button type="submit" class="btn btn-gradient-primary mb-2">Submit</button>
                                 <button class="btn btn-light mb-2" onClick={_handleCancelForm}>Cancel</button>
                         </form>
                       </div>
                    </div>
                </div>
            </div>           
            </UserStyle>
        </Fragment>
    )
}

export default ProfileForm