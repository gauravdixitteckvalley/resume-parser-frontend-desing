import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { Form } from "react-bootstrap";

import UserStyle from "./style";
import BlockUI from "../../components/BlockUI";
import { history } from "../../utils/helper";
import validateProfileForm from "./ProfileFormValidation";
import Inputbox from "../../components/Inputbox";
import {
  fetchUserEditFormDependantData,
  submitUserFormData,
  resetUserData,
  fetchUserRolesData,
  fetchUserByRole,
} from "../../actions/User";

const ProfileForm = (props) => {
  const currentId = props?.match?.params?.id;
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [applyCheck] = useState(currentId ? false : true);
  const [roles, setRoles] = useState([]);
  const [usersList, setusersList] = useState({});
  const userData = useSelector((state) => state.authenticatedUser);
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  let [first, last] = userData.user.full_name.split(" ");
  const [lastName,setLastName]= useState(last)
  const [oldPass,setOldPass]= useState('');
  const [newPass,setNewPass]= useState('');
  

  /**hook equivalent to componentdidmount lifecycle */
  useEffect(() => {
    if (userData.id) {
      dispatch(fetchUserEditFormDependantData(userData.id)); // action is called to fetch record
    } else {
      dispatch(fetchUserRolesData());
    }

    // returned function will be called on component unmount
    return () => {
      dispatch(resetUserData());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**section to be executed when we open the form in edit mode */
  if (currentId && typeof userData != "undefined" && _.size(userData) > 0)
    if (_.size(userData.user) !== _.size(fields))
      setFields({ ...userData.user });
  /**end of section to be executed when we open the form in edit mode */

  /* validate form */
  const _validateForm = () => {
    let formFields = fields;
    let response = validateProfileForm(formFields, applyCheck);
    setErrors(response.errors);
    return response.formIsValid;
  };

  /* handle input field changes */
  const _handleChange = (event) => {
    let data = fields;
    if(event.target.name === "old_password"){
    }
    if(event.target.name === "password"){
    }
    data[event.target.name] = event.target.value;
    setFields({ ...data });
  };

  /* submit form */
  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      const { password, old_password } =
        event.target;
      const postData = {
        password: password.vaule,
        old_password: old_password.vaule,

      };

      if (userData.id) {
        dispatch(submitUserFormData(userData.id, postData)); //action is called to submit data
      } else {
        postData.password = password.value;
        dispatch(submitUserFormData("", postData)); // action is called to submit data
      }
    }
  };

  /**method called when form is cancelled */
  const _handleCancelForm = () => {
    history.push("/profile");
  };
  const { blocking, user_roles, user_list } = userData;
  return (
    <Fragment>
      <BlockUI blocking={blocking} />
      <UserStyle>
        <div className="page-header">
          <h3 className="page-title"> Change Password</h3>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form
                  onSubmit={(event) => _handleSubmit(event)}
                  className="form-inline"
                >
                  
                  <div className="row mt-2">
                    <div className="col-md-4">
                        <Inputbox
                            labelStatus={true}
                            labelValue="Old Password"
                            labelClass="mb-1"
                            labelFor="old_password"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="password"
                            name="old_password"
                            id="old_password"
                            value={fields.old_password || ""}
                            handleClick={(event) => _handleChange(event)}
                            placeholder="Enter old password"
                        />
                      <div className="errorMsg">{errors.old_password}</div>
                    </div>
                    <div className="col-md-4">
                        <Inputbox
                            labelStatus={true}
                            labelValue="New Password"
                            labelClass="mb-1"
                            labelFor="password"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="password"
                            name="password"
                            id="password"
                            value={fields.password || ""}
                            handleClick={(event) => _handleChange(event)}
                            placeholder="Enter new password"
                            minLength="6" 
                        />
                        <div className="errorMsg">{errors.password}</div>
                    </div>
                    
                    <div className="col-md-4">
                        <Inputbox
                            labelStatus={true}
                            labelValue="Confirm Password"
                            labelClass="mb-1"
                            labelFor="confirm_password"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            value={fields.confirm_password || ""}
                            handleClick={(event) => _handleChange(event)}
                            placeholder="Enter confirm password"
                            minLength="6" 
                        />
                        <div className="errorMsg">{errors.confirm_password}</div> 
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <button
                        type="submit"
                        className="btn btn-gradient-primary mb-2"
                      >
                        Submit
                      </button>
                      <button
                        className="btn btn-light mb-2"
                        onClick={_handleCancelForm}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </UserStyle>
    </Fragment>
  );
};

export default ProfileForm;
