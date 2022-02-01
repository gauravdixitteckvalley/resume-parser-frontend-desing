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
  
  const [fields, setFields] = useState({'profile_image':''});
  const [errors, setErrors] = useState({});
  
  const [roles, setRoles] = useState([]);
  const [usersList, setusersList] = useState({});
  /**fetched data from redux store */
  const userData = useSelector(state => state.authenticatedUser);
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  let [first, last] = userData.user.full_name.split(" ");
  const [lastName,setLastName]= useState(last)
  const currentId = userData.user.id;
  const [applyCheck] = useState(currentId ? false : true);

  /**hook equivalent to componentdidmount lifecycle */
  useEffect(() => {
    if (userData.user.id) {
      dispatch(fetchUserEditFormDependantData(userData.user.id)); // action is called to fetch record
    } else {
      dispatch(fetchUserRolesData());
    }

    // returned function will be called on component unmount
    return () => {
      dispatch(resetUserData());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**section to be executed when we open the form in edit mode */
  if (currentId && typeof userData != "undefined" && _.size(userData) > 0){
    if (_.size(userData.user) !== _.size(fields)){
      //console.log("demo")
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
    if (event.target.name === "user_role") {
      dispatch(fetchUserByRole(event.target.value));
    }
    if (event.target.name === "profile_image") {
      let file_name = event.target.files[0].name;
      console.log(file_name," event ")
      setFile(file_name);
    }
    if(event.target.name === "last_name"){
      let lName= lastName;
      lName = event.target.value;
      setLastName(lName)
    }
    
    data[event.target.name] = event.target.value;
    setFields({ ...data });
  };

  /* submit form */
  const _handleSubmit = (event) => {
    event.preventDefault();
    if (_validateForm()) {
      const { first_name, last_name, email,  username, profile_image, user_role } =
        event.target;
      const postData = {
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
        profile_image:profile_image.files[0].name,
        username: username.value,
        user_role: user_role.value,
      };

      if (userData.id) {
        dispatch(submitUserFormData(userData.id, postData)); //action is called to submit data
      } else {
       
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
                        <Inputbox
                            labelStatus={true}
                            labelValue="First Name"
                            labelClass="mb-1"
                            labelFor="first_name"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={fields.first_name || ""}
                            handleClick={(event) => _handleChange(event)}
                            minLength="3"
                            placeholder="Enter first name"
                        />
                        <div className="errorMsg">{errors.first_name}</div>
                    </div>

                    <div className="col-md-6">
                        <Inputbox
                            labelStatus={true}
                            labelValue="Last Name"
                            labelClass="mb-1"
                            labelFor="last_name"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={lastName || ""}
                            handleClick={(event) => _handleChange(event)}
                            minLength="3"
                            placeholder="Enter last name"
                        />
                        <div className="errorMsg">{errors.last_name}</div>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6">
                        <Inputbox
                            labelStatus={true}
                            labelValue="Username"
                            labelClass="mb-1"
                            labelFor="username"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="text"
                            name="username"
                            id="username"
                            value={fields.username || ""}
                            handleClick={(event) => _handleChange(event)}
                            minLength="3"
                            placeholder="Enter username"
                            readonly={true}
                        />
                        <div className="errorMsg">{errors.username}</div>
                    </div>

                    <div className="col-md-6">
                        <Inputbox
                            labelStatus={true}
                            labelValue="Email"
                            labelClass="mb-1"
                            labelFor="email"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="email"
                            name="email"
                            id="email"
                            value={fields.email || ""}
                            handleClick={(event) => _handleChange(event)}
                            placeholder="Enter email"
                            readonly={true}
                        />
                        <div className="errorMsg">{errors.email}</div>
                    </div>
                  </div> 
                  <div className="row mt-2">
                    
                    <div className="col-md-6">
                         <Inputbox
                            labelStatus={true}
                            labelValue="Profile Image"
                            labelClass="mb-1"
                            labelFor="profile_image"
                            className="form-control mb-2 mr-sm-2 col-md-6" 
                            type="file"
                            name="profile_image"
                            id="profile_image"
                            handleClick={(event) => _handleChange(event)}
                            placeholder="Upload profile"
                        />
                        <div className="errorMsg">{errors.profile_image}</div> 
                    </div>
                    <div className="col-md-6">
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
