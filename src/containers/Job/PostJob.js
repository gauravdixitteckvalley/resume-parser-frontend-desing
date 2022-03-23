import React, { Fragment } from "react";
//import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
//import Dropzone from "react-dropzone-uploader";
//import "react-dropzone-uploader/dist/styles.css";

import BlockUI from "../../components/BlockUI";
//import { API_URL, displayErrorMessage } from "../../utils/helper";
//import { submitResumeData } from "../../actions/Resume";
//import resumeSampleFile from "../../assets/files/resumeSampleFile.docx";
import { Form, Row, Button } from "react-bootstrap";
import {  getCountryList,getStateList } from "../../actions/Resume"
import {  submitCandidateData,submitManualResumeFormData  } from "../../actions/Candidate";
import './PostJob.css';

export default function PostJob() {
    let fileArray = [];
  
    const blocking = false;
  
    const submitFormData = (e) => {
        e.preventDefault();
        
        // if (_validateForm()) {
        //     if(currentId){
        //         dispatch(submitCandidateData(currentId, fields));
        //         setTimeout(function(){  props.nextStep(); }, 2000);
        //     }else{
                
        //         dispatch(submitManualResumeFormData(fields))
        //         setTimeout(function(){  props.nextStep(); }, 2000);
        //     }
        // }
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
                                        //style={{ border: errorFields?.firstName ? "2px solid red" : "" }}
                                        name="jobTitle"
                                        type="text"
                                        placeholder="Job Title"
                                        //value={fields.firstName}
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.firstName} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Exprience Required </Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.lastName ? "2px solid red" : "" }}
                                        name="exp"
                                        //value={fields.lastName}
                                        type="text"
                                        placeholder="Exprience Required"
                                        //onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.lastName} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>No of opening </Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        //style={{ border: errorFields?.country ? "2px solid red" : "" }} 
                                        name="opening" 
                                       // onChange={(event) => _handleChange(event)} 
                                        //value = { fields?.country }
                                    >
                                        <option value="">Select Opening</option>
                                        {/* {countryList?.map((country, index) => (
                                            <option key={index}  value={country._id}>{country.name}</option>
                                        ))} */}
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.country} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        //style={{ border: errorFields?.state ? "2px solid red" : "" }} 
                                        name="Location" 
                                       // onChange={(event) => _handleChange(event)} 
                                        //value={ fields?.state }
                                    >
                                        <option value="">Select Location</option>
                                        {/* {stateList?.map((state, index) => (
                                            <option key={index} value={state._id}>{state.name}</option>
                                        ))} */}
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.state} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Salary Range</Form.Label>
                                    <Form.Control
                                        //style={{ border: errorFields?.city ? "2px solid red" : "" }}
                                        name="salary" 
                                        type="text"
                                        placeholder="Salary Range"
                                       // onChange={(event) => _handleChange(event)}
                                        //value={fields.city} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.city} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Key Skills (must have)</Form.Label>
                                    <Form.Control
                                        //style={{ border: errorFields?.firstName ? "2px solid red" : "" }}
                                        name="keySkills"
                                        type="text"
                                        placeholder="React, PHP"
                                        //value={fields.firstName}
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.firstName} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Other Skills </Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.lastName ? "2px solid red" : "" }}
                                        name="otherSkills"
                                        //value={fields.lastName}
                                        type="text"
                                        placeholder="Other Skills"
                                        //onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.lastName} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Job Description </Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.address ? "2px solid red" : "" }}
                                        name="jd"
                                        //value={fields.address}
                                        as="textarea"
                                        placeholder="Job Description"
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.address} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Industry type</Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.zip ? "2px solid red" : "" }}
                                        name="industryType"
                                        type="text"
                                        placeholder="Industry type"
                                       // onChange={(event) => _handleChange(event)} 
                                        //value={fields.zip}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.zip} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Functional area</Form.Label>
                                        <Form.Control
                                           // style={{ border: errorFields?.email ? "2px solid red" : "" }}
                                            name="functionalArea"
                                            type="text"
                                            placeholder="Functional area"
                                            //value={fields.email}
                                            //onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {/* {errorFields.email} */}
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Role</Form.Label>
                                        <Form.Control
                                           // style={{ border: errorFields?.phone ? "2px solid red" : "" }}
                                            name="role"
                                            type="text"
                                            placeholder="Role"
                                            //onChange={(event) => _handleChange(event)} 
                                            //value={fields.phone}
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {/* {errorFields.phone} */}
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
                                            name="group1"
                                            type="checkbox"
                                        />
                                        <Form.Check
                                            inline
                                            label="Part Time"
                                            name="group1"
                                            type="checkbox"
                                        />
                                        <Form.Check
                                            inline
                                            label="Contractual"
                                            name="group1"
                                            type="checkbox"
                                        />
                                    </div>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.zip} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Education</Form.Label>
                                        <Form.Control
                                           // style={{ border: errorFields?.email ? "2px solid red" : "" }}
                                            name="education"
                                            type="text"
                                            placeholder="Education"
                                            //value={fields.email}
                                            //onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {/* {errorFields.email} */}
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Recruiter Details </Form.Label>
                                        <Form.Select 
                                            aria-label="Default select example" 
                                            //style={{ border: errorFields?.state ? "2px solid red" : "" }} 
                                            name="Location" 
                                        // onChange={(event) => _handleChange(event)} 
                                            //value={ fields?.state }
                                        >
                                            <option value="">Select Recruiter</option>
                                            {/* {stateList?.map((state, index) => (
                                                <option key={index} value={state._id}>{state.name}</option>
                                            ))} */}
                                        </Form.Select>
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {/* {errorFields.phone} */}
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
                                        //style={{ border: errorFields?.firstName ? "2px solid red" : "" }}
                                        name="companyName"
                                        type="text"
                                        placeholder="Company Name"
                                        //value={fields.firstName}
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.firstName} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Company Website</Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.lastName ? "2px solid red" : "" }}
                                        name="companyWebsite"
                                        //value={fields.lastName}
                                        type="text"
                                        placeholder="www.xyz.com"
                                        //onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.lastName} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Company Details</Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.address ? "2px solid red" : "" }}
                                        name="companyDetails"
                                        as="textarea"
                                        placeholder="Company Details"
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.address} */}
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