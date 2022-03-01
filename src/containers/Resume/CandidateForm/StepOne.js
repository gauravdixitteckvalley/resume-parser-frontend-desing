import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Button } from "react-bootstrap";
import _ from "lodash";
import validateCandidateForm  from "./CandidateFromValidation";
import {  getCountryList,getStateList } from "../../../actions/Resume"
import {  submitCandidateData,submitManualResumeFormData  } from "../../../actions/Candidate";


// creating functional component ans getting props from app.js and destucturing them
const StepOne = (props) => {
    const currentId = props.cdId;
    const [errorFields, setErrorFields] = useState({});
    const resumeData = useSelector(state => state.resume );
    let countries = ''
    let states = '';
    const { countryList, stateList } = resumeData;
   // console.log("stateList " ,stateList)
   // debugger;
    let name = props.handleFormData.name;
    const [status,setStatus] =useState(true);
    const [fields, setFields] = useState({
        firstName: "",
        lastName:  "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        email: "",
        phone: "",
        step:1
    });

    const [error, setError] = useState(false);
    const dispatch = useDispatch(); 
  
    const _handleChange = (event) => {
        let data = fields;
        if(event.target.name === 'country'){
            let countryid = event.target.value;
            dispatch(getStateList(countryid));    
        }
        data[event.target.name] = event.target.value;
        setFields({...data})      
    }
    useEffect(() => {
        countries = dispatch(getCountryList());
        //if(!_.isEmpty(props.handleFormData)){
          //  console.log("props?.handleFormData?.country ",props?.handleFormData?.country)
          states= dispatch(getStateList(101))
            //console.log("states ",states)
       // }
        if(!_.isEmpty(props.handleFormData)){
            let fname=''
            let lname=''
            console.log('name ',name)
            if(name){
                let fulname =  name.split(" ");
                fname=fulname[0]
                lname=fulname[1]
                console.log('name ',fulname)
            }
            setFields({
                firstName:fname,
                lastName: lname,
                address: props.handleFormData.location,
                country: props?.handleFormData?.country,
                state: props?.handleFormData?.state,
                city: props?.handleFormData?.place,
                zip: props?.handleFormData?.zip,
                email: props?.handleFormData?.email,
                phone: props?.handleFormData?.phone,
                step:1
            })
            setStatus(false)
        }
    }, []);

    const _validateForm = () => {
        let formNumber = "form1";
        let formFields = fields;
        let response = validateCandidateForm(formNumber,formFields);
        setErrorFields(response.errorFields);
        return response.formIsValid;
    };
    
    const submitFormData = (e) => {
        e.preventDefault();
        
        if (_validateForm()) {
            if(currentId){
                dispatch(submitCandidateData(currentId, fields));
                setTimeout(function(){  props.nextStep(); }, 2000);
            }else{
                console.log("demo second")
                dispatch(submitManualResumeFormData(fields))
                setTimeout(function(){  props.nextStep(); }, 2000);
            }
        }
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
                                        style={{ border: errorFields?.firstName ? "2px solid red" : "" }}
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        value={fields.firstName}
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.firstName}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.lastName ? "2px solid red" : "" }}
                                        name="lastName"
                                       // defaultValue={values.lastName}
                                       value={fields.lastName}
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
                                        style={{ border: errorFields?.address ? "2px solid red" : "" }}
                                        name="address"
                                        value={fields.address}
                                        as="textarea"
                                        placeholder="Address"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.address}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: errorFields?.country ? "2px solid red" : "" }} 
                                        name="country" 
                                        onChange={(event) => _handleChange(event)} 
                                        //defaultValue={values.country} onChange={handleFormData("country")}
                                    >
                                        <option value="">Select Country</option>
                                        {countryList?.map((country, index) => (
                                            <option key={index} selected={country._id == fields.country ? true :false } value={country._id}>{country.name}</option>
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
                                        style={{ border: errorFields?.state ? "2px solid red" : "" }} 
                                        name="state" 
                                        onChange={(event) => _handleChange(event)} 
                                        //defaultValue={values.state} onChange={handleFormData("state")}
                                    >
                                        <option value="">Select State</option>
                                        {stateList?.map((state, index) => (
                                            <option key={index} selected={state._id == fields.state ? true :false } value={state._id}>{state.name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.state}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.city ? "2px solid red" : "" }}
                                        name="city" 
                                        type="text"
                                        placeholder="City"
                                        onChange={(event) => _handleChange(event)}
                                        //value={fields.city ? fields.city : props?.handleFormData?.place} 
                                        value={fields.city} 
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
                                        style={{ border: errorFields?.zip ? "2px solid red" : "" }}
                                        name="zip"
                                        //defaultValue={values.zip}
                                        type="text"
                                        placeholder="Zip Code"
                                        onChange={(event) => _handleChange(event)} 
                                        //value={fields.zip ? fields.zip : props?.handleFormData?.zip}
                                        value={fields.zip}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.zip}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            style={{ border: errorFields?.email ? "2px solid red" : "" }}
                                            name="email"
                                            //defaultValue={values.email}
                                            type="email"
                                            placeholder="Email"
                                            value={fields.email}
                                            onChange={(event) => _handleChange(event)} 
                                           // value={fields.email ? fields.email : props?.handleFormData?.email}
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {errorFields.email}
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            style={{ border: errorFields?.phone ? "2px solid red" : "" }}
                                            name="phone"
                                            type="text"
                                            placeholder="Phone"
                                            onChange={(event) => _handleChange(event)} 
                                            value={fields.phone}
                                           // value={fields.phone ? fields.phone : props?.handleFormData?.phone}
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