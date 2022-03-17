import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import UserStyle from "./style";
import BlockUI from "../../components/BlockUI";
import { history } from "../../utils/helper";
import validateProfileForm from "./ProfileFormValidation";
import InputBox from "../../components/InputBox/InputBox";
import {
  fetchUserEditFormDependantData,
  resetUserData
} from "../../actions/User";
import {
  submitProfileFormData,
} from "../../actions/Profile";
import "./style.css"

const ProfileForm = (props) => {
  
  const [fields, setFields] = useState({'profile_image':''});
  const [errors, setErrors] = useState({});

  /**fetched data from redux store */
  const userData = useSelector(state => state.authenticatedUser);
  const dispatch = useDispatch();
  const currentId = userData.user.id;
  const [applyCheck] = useState(currentId ? false : true);
  /**hook equivalent to componentdidmount lifecycle */
  useEffect(() => {
      dispatch(fetchUserEditFormDependantData(userData.user.id)); // action is called to fetch record
    return () => {
      dispatch(resetUserData());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**section to be executed when we open the form in edit mode */
  if (currentId && typeof userData != "undefined" && _.size(userData) > 0){
    if (_.size(userData.user) !== _.size(fields)){
      setFields({ ...userData.user });
    }
  }
    
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
    data[event.target.name] = event.target.value;
    setFields({ ...data });
    
    };

  /* submit form */
  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      const postData = new FormData(event.target);
      dispatch(submitProfileFormData(currentId, postData)); //action is called to submit data
    }
  };

  /**method called when form is cancelled */
  const _handleCancelForm = () => {
    history.push("/profile");
  };
  const { blocking } = userData;
  return (
    <Fragment>
      <BlockUI blocking={blocking} />
      <UserStyle>
        <div className="page-header">
          <h3 className="page-title"> Edit Profile</h3>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <form
                  onSubmit={(event) => _handleSubmit(event)}
                  className="form-inline"
                >
                  <div className="row">
                    <div className="col-md-6">
                        <InputBox
                            labelStatus={true}
                            labelValue="First Name"
                            labelClass="mb-1"
                            labelFor="first_name"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={fields.first_name || ""}
                            handleinputchange={(event) => _handleChange(event)}
                            minLength="3"
                            placeholder="Enter first name"
                        />
                        <div className="errorMsg">{errors.first_name}</div>
                    </div>

                    <div className="col-md-6">
                        <InputBox
                            labelStatus={true}
                            labelValue="Last Name"
                            labelClass="mb-1"
                            labelFor="last_name"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={fields.last_name || ""}
                            handleinputchange={(event) => _handleChange(event)}
                            minLength="3"
                            placeholder="Enter last name"
                        />
                        <div className="errorMsg">{errors.last_name}</div>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6">
                        <InputBox
                            labelStatus={true}
                            labelValue="Username"
                            labelClass="mb-1"
                            labelFor="username"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="text"
                            name="username"
                            id="username"
                            value={fields.username || ""}
                            handleinputchange={(event) => _handleChange(event)}
                            minLength="3"
                            placeholder="Enter username"
                            readonly={true}
                        />
                        <div className="errorMsg">{errors.username}</div>
                    </div>

                    <div className="col-md-6">
                        <InputBox
                            labelStatus={true}
                            labelValue="Email"
                            labelClass="mb-1"
                            labelFor="email"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="email"
                            name="email"
                            id="email"
                            value={fields.email || ""}
                            handleinputchange={(event) => _handleChange(event)}
                            placeholder="Enter email"
                            readonly={true}
                        />
                        <div className="errorMsg">{errors.email}</div>
                    </div>
                  </div> 
                  <div className="row mt-2">
                    
                    <div className="col-md-6">
                         {/* <InputBox
                            labelStatus={true}
                            labelValue="Profile Image"
                            labelClass="mb-1"
                            labelFor="profile_image"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="file"
                            name="profile_image"
                            id="profile_image"
                            handleinputchange={(event) => _handleChange(event)}
                            placeholder="Upload profile"

                        />                             */}
                        <label className="mb-1" htmlFor="profile_image">Profile Image</label>

                        <input type="file" 
                          name="profile_image"
                            id="profile_image" 
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            onChange={(event) => _handleChange(event)}
                            placeholder="Upload profile" 
                          />
                        <div className="errorMsg">{errors.profile_image}</div> 
                    </div>
                    <div className="col-md-6">
                      <img src={fields.profile_image ? fields.profile_image :"/assets/img/user_icon.png"} alt="profile" className="img-fluid profile_image" />
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