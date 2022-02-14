import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Button } from "react-bootstrap";
import _ from "lodash";
import validateCandidateForm  from "./CandidateFromValidation";
import {  getStateList } from "../../../actions/Resume"



// creating functional component ans getting props from app.js and destucturing them
const StepOne = (props,{ nextStep }) => {
    const currentId = props?.match?.params?.id;
    console.log("currentId ",props)
    const [errorFields, setErrorFields] = useState({});
    const resumeData = useSelector(state => state.resume );
    const { countryList, stateList } = resumeData;
    const [fields, setFields] = useState({
        firstName: "",
        lastName: "",
        location: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        email: "",
        phone: ""
    });
    const [error, setError] = useState(false);
    const dispatch = useDispatch(); 
  
    if(currentId && typeof resumeData != "undefined" && (_.size(resumeData) > 0))
        if (_.size(resumeData.resumeDetails) !== _.size(fields))
            setFields({...resumeData.resumeDetails})

  // after form submit validating the form data using validator
  const _handleChange = (event) => {
    let data = fields;
    if(event.target.name === 'country'){
        let countryid = event.target.value;
        dispatch(getStateList(countryid));    
    }
    //console.log("event.target.name : ",event.target.name," event.target.value : ",event.target.value)

      data[event.target.name] = event.target.value;
      setFields({...data})
  }

    const _validateForm = () => {
        let formNumber = "form1";
        let formFields = fields;
        console.log(formFields, " formFields")
        let response = validateCandidateForm(formNumber,formFields);
        setErrorFields(response.errorFields);
        return response.formIsValid;

    };
  const submitFormData = (e) => {
    e.preventDefault();
    // if (_validateForm()) {
    //     console.log("valid ")
    // }
    // checking if value of first name and last name is empty show error else take to step 2
    /*if (
      validator.isEmpty(values.firstName) ||
      validator.isEmpty(values.lastName) ||
      validator.isEmpty(values.email) ||
      validator.isEmpty(values.location) ||
      validator.isEmpty(values.city) ||
      validator.isEmpty(values.zip) ||
      validator.isEmpty(values.state) ||
      validator.isEmpty(values.country) ||
      validator.isEmpty(values.email) ||
      validator.isEmpty(values.phone) 
    ) {
      setError(true);
    } else {
      nextStep();
    }*/
    props.nextStep();
  };

  return (
      
       <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                      <div className="card-body">
                      <div className="text-center">
                        <h3 className="page-title" style={{fontSize: '25px'}}> Complete Your Profile <br/><span style={{fontSize: '12px'}}>Employers will use this information to contact you.</span></h3>
                      </div>
                      <hr className="mb-4" />
                      <h3 className="page-title font-style-bold mb-4">
                        <span className="page-title-icon bg-gradient-primary text-white me-2">
                            <i className="mdi mdi-checkbox-marked"></i>
                        </span> PERSONAL INFO
                      </h3>
                        <Form onSubmit={submitFormData}>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.firstName}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        name="lastName"
                                       // defaultValue={values.lastName}
                                        type="text"
                                        placeholder="Last Name"
                                        onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.lastName}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        name="location"
                                       // defaultValue={values.location}
                                        as="textarea"
                                        placeholder="Address"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.location}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: error ? "2px solid red" : "" }} 
                                        name="country" 
                                        onChange={(event) => _handleChange(event)} 
                                        //defaultValue={values.country} onChange={handleFormData("country")}
                                    >
                                        <option value="">Select Country</option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} value={country._id}>{country.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.country}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: error ? "2px solid red" : "" }} 
                                        name="state" 
                                        onChange={(event) => _handleChange(event)} 
                                        //defaultValue={values.state} onChange={handleFormData("state")}
                                    >
                                        <option value="">Select State</option>
                                        {stateList?.map((state, index) => (
                                            <option key={index} value={state._id}>{state.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.state}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        name="city" 
                                        type="text"
                                        placeholder="City"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.city}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        name="zip"
                                        //defaultValue={values.zip}
                                        type="text"
                                        placeholder="Zip Code"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.zip}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            style={{ border: error ? "2px solid red" : "" }}
                                            name="email"
                                            //defaultValue={values.email}
                                            type="email"
                                            placeholder="Email"
                                            onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {errorFields.email}
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            style={{ border: error ? "2px solid red" : "" }}
                                            name="phone"
                                            //defaultValue={values.phone}
                                            type="text"
                                            placeholder="Phone"
                                            onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {errorFields.phone}
                                        </Form.Text>
                                </Form.Group>
                            </Row>
                            <Button className= "btn btn-gradient-primary mt-4 mb-2" variant="primary" type="submit">
                            Next
                            </Button>
                        </Form>
                      </div>
                    </div>
                  </div>
            </div> 
   
  );
};

export default StepOne;