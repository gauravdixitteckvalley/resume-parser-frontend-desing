import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BlockUI from "../../components/BlockUI";
import { Form, Row, Button } from "react-bootstrap";
import PostJobValidation from './PostJobValidation';
import {submitJobPost} from "../../actions/Job/index";
import { useSelector, useDispatch } from "react-redux";
import './PostJob.css';


export default function PostJob() {

    const [errorFields, setErrorFields] = useState({});
    let currentUser= JSON.parse(localStorage.getItem('data'));
    //console.log("currentUser  ",currentUser)
    const [fields, setFields] = useState({
        jobTitle: "",
        exp:  "",
        highlights: "",
        opening: "",
        location: "",
        salary: "",
        keySkills: "",
        otherSkills: "",
        jd: "",
        industryType: "",
        functionalArea: "",
        role: "",
        empType: "",
        education: "",
        recruitDetails: "",
        companyName: "",
        companyWebsite: "",
        companyDetails: "",
        cId:currentUser?.id,
    });
    const dispatch = useDispatch();
    let opening = 10;
    let openArry = []
    let jobLocation = ['Delhi','Noida','Gurugram','Bangalore','kolkata','Mumbai','Chandigarh','Any Where']
    for(let i= 1; i <= opening; i++ ){
        openArry.push(i)
    }
    
    let fileArray = [];
  
    const blocking = false;

    const _validateForm = () => {
        let formFields = fields;
        let response = PostJobValidation(formFields);
        setErrorFields(response.errorFields);
        return response.formIsValid;
    };

    const _handleChange = (event) => {
        let data = fields;
        if(event.target.name === 'jobTitle'){
            let jobTitle = event.target.value;    
        }
       // console.log("event.target.name ", event.target.name , " event.target.value ",event.target.value)
        data[event.target.name] = event.target.value;
        setFields({...data})      
    }
  
    const submitFormData = (e) => {
        e.preventDefault();
        console.log("fields ")
        if (_validateForm()) {
            console.log("gfghfg")
            dispatch(submitJobPost(fields));
        } 
        
    };
    return (
      <Fragment>
        <BlockUI blocking={blocking} />
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
                <div className="card"> 
                    <div className="card-body">
                      <div className="text-center">
                        <h3 className="page-title" style={{fontSize: '25px'}}>New Job Post</h3>
                      </div>
                      <hr className="mb-4" />
                     
                        <Form onSubmit={submitFormData}>
                            <Row>
                                <h3 className="page-title font-style-bold mb-3">
                                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                                        <i className="mdi mdi-checkbox-marked"></i>
                                    </span> Job Details 
                                </h3>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.jobTitle ? "2px solid red" : "" }}
                                        name="jobTitle"
                                        type="text"
                                        placeholder="Job Title"
                                        value={fields.jobTitle}
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.jobTitle}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Exprience Required </Form.Label>
                                    <Form.Control
                                       style={{ border: errorFields?.exp ? "2px solid red" : "" }}
                                        name="exp"
                                        value={fields.exp}
                                        type="text"
                                        placeholder="Exprience Required"
                                        onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.exp}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Job Highlights </Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.highlights ? "2px solid red" : "" }}
                                        name="highlights"
                                        value={fields.highlights}
                                        as="textarea"
                                        placeholder="Job Highlights"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.highlights}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>No of opening </Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: errorFields?.opening ? "2px solid red" : "" }} 
                                        name="opening" 
                                        onChange={(event) => _handleChange(event)} 
                                        value = { fields?.opening }
                                    >
                                        <option value="">Select Opening</option>
                                          {openArry?.map((open, index) => (
                                            <option key={index}  value={open}>{open}</option>
                                        ))}  
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.opening}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        style={{ border: errorFields?.location ? "2px solid red" : "" }} 
                                        name="location" 
                                        onChange={(event) => _handleChange(event)} 
                                        value={ fields?.location }
                                    >
                                        <option value="">Select Location</option>
                                         {jobLocation?.map((location, index) => (
                                            <option key={index} value={location}>{location}</option>
                                        ))} 
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.location}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Salary Range</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.salary ? "2px solid red" : "" }}
                                        name="salary" 
                                        type="text"
                                        placeholder="Salary Range"
                                        onChange={(event) => _handleChange(event)}
                                        value={fields.salary} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.salary}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Key Skills (must have)</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.keySkills ? "2px solid red" : "" }}
                                        name="keySkills"
                                        type="text"
                                        placeholder="React, PHP"
                                        value={fields.keySkills}
                                       onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.keySkills}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Other Skills </Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.otherSkills ? "2px solid red" : "" }}
                                        name="otherSkills"
                                        value={fields.otherSkills}
                                        type="text"
                                        placeholder="Other Skills"
                                        onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.otherSkills}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Job Description </Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.jd ? "2px solid red" : "" }}
                                        name="jd"
                                        value={fields.jd}
                                        as="textarea"
                                        placeholder="Job Description"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.jd}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Industry type</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.industryType ? "2px solid red" : "" }}
                                        name="industryType"
                                        type="text"
                                        placeholder="Industry type"
                                        onChange={(event) => _handleChange(event)} 
                                        value={fields.industryType}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.industryType}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Functional area</Form.Label>
                                        <Form.Control

                                            style={{ border: errorFields?.functionalArea ? "2px solid red" : "" }}
                                            name="functionalArea"
                                            type="text"
                                            placeholder="Functional area"
                                            value={fields.functionalArea}
                                            onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {errorFields.functionalArea}
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Role</Form.Label>
                                        <Form.Control
                                            style={{ border: errorFields?.role ? "2px solid red" : "" }}
                                            name="role"
                                            type="text"
                                            placeholder="Role"
                                            onChange={(event) => _handleChange(event)} 
                                            value={fields.role}
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {errorFields.role}
                                        </Form.Text>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-4 col-md-4">
                                    <Form.Label>Employement Type </Form.Label>
                                    <div className="emp-type">
                                        <Form.Check
                                            inline
                                            label="Full Time"
                                            name="empType"
                                            type="checkbox"
                                            //onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Check
                                            inline
                                            label="Part Time"
                                            name="empType"
                                            type="checkbox"
                                            //onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Check
                                            inline
                                            label="Contractual"
                                            name="empType"
                                            type="checkbox"
                                            //onChange={(event) => _handleChange(event)} 
                                        />
                                    </div>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.empType} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Education</Form.Label>
                                        <Form.Control
                                            style={{ border: errorFields?.education ? "2px solid red" : "" }}
                                            name="education"
                                            type="text"
                                            placeholder="Education"
                                            value={fields.education}
                                            onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {errorFields.education}
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Recruiter Details </Form.Label>
                                        <Form.Select 
                                            aria-label="Default select example" 
                                            style={{ border: errorFields?.recruitDetails ? "2px solid red" : "" }} 
                                            name="recruitDetails" 
                                            onChange={(event) => _handleChange(event)} 
                                            value={ fields?.recruitDetails }
                                        >
                                            <option value="">Select Recruiter</option>
                                            {/* {stateList?.map((state, index) => (
                                                <option key={index} value={state._id}>{state.name}</option>
                                            ))} */}
                                            <option value="">Select Location</option>
                                         {jobLocation?.map((location, index) => (
                                            <option key={index} value={`${location}${index}`}>{location}{index}</option>
                                        ))}
                                        </Form.Select>
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {errorFields.recruitDetails}
                                        </Form.Text>
                                </Form.Group>
                            </Row>
                            <hr className="mb-4" />
                            <Row>
                                <h3 className="page-title font-style-bold mb-3">
                                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                                        <i className="mdi mdi-checkbox-marked"></i>
                                    </span> About The Company 
                                </h3>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.companyName ? "2px solid red" : "" }}
                                        name="companyName"
                                        type="text"
                                        placeholder="Company Name"
                                        value={fields.companyName}
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.companyName}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Company Website</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.companyWebsite ? "2px solid red" : "" }}
                                        name="companyWebsite"
                                        value={fields.companyWebsite}
                                        type="text"
                                        placeholder="www.xyz.com"
                                        onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.companyWebsite}
                                    </Form.Text>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Company Details</Form.Label>
                                    <Form.Control
                                        style={{ border: errorFields?.companyDetails ? "2px solid red" : "" }}
                                        name="companyDetails"
                                        as="textarea"
                                        placeholder="Company Details"
                                        onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {errorFields.companyDetails}
                                    </Form.Text>
                                </Form.Group>
                            </Row>

                            <Button className= "btn btn-gradient-primary mt-4 mb-2" variant="primary" type="submit">
                            Publish
                            </Button>
                        </Form>
                      </div>
                    </div>
          </div>
        </div>
      </Fragment>
    )
}