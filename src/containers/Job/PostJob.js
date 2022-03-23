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
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control
                                        //style={{ border: errorFields?.firstName ? "2px solid red" : "" }}
                                        name="jobTitle"
                                        type="text"
                                        placeholder="Job Title"
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.firstName} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>

                            <Row>
                                <h3 className="page-title font-style-bold mt-4 mb-3">
                                    <span className="page-title-icon bg-gradient-primary text-white me-2">
                                        <i className="mdi mdi-checkbox-marked"></i>
                                    </span> Job Description Details 
                                </h3>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        //style={{ border: errorFields?.firstName ? "2px solid red" : "" }}
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        //value={fields.firstName}
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.firstName} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.lastName ? "2px solid red" : "" }}
                                        name="lastName"
                                        //value={fields.lastName}
                                        type="text"
                                        placeholder="Last Name"
                                        //onChange={(event) => _handleChange(event)}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.lastName} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.address ? "2px solid red" : "" }}
                                        name="address"
                                        //value={fields.address}
                                        as="textarea"
                                        placeholder="Address"
                                       // onChange={(event) => _handleChange(event)} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.address} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        //style={{ border: errorFields?.country ? "2px solid red" : "" }} 
                                        name="country" 
                                       // onChange={(event) => _handleChange(event)} 
                                        //value = { fields?.country }
                                    >
                                        <option value="">Select Country</option>
                                        {/* {countryList?.map((country, index) => (
                                            <option key={index}  value={country._id}>{country.name}</option>
                                        ))} */}
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.country} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        //style={{ border: errorFields?.state ? "2px solid red" : "" }} 
                                        name="state" 
                                       // onChange={(event) => _handleChange(event)} 
                                        //value={ fields?.state }
                                    >
                                        <option value="">Select State</option>
                                        {/* {stateList?.map((state, index) => (
                                            <option key={index} value={state._id}>{state.name}</option>
                                        ))} */}
                                    </Form.Select>
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.state} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        //style={{ border: errorFields?.city ? "2px solid red" : "" }}
                                        name="city" 
                                        type="text"
                                        placeholder="City"
                                       // onChange={(event) => _handleChange(event)}
                                        //value={fields.city} 
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.city} */}
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                       // style={{ border: errorFields?.zip ? "2px solid red" : "" }}
                                        name="zip"
                                        type="text"
                                        placeholder="Zip Code"
                                       // onChange={(event) => _handleChange(event)} 
                                        //value={fields.zip}
                                    />
                                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                                        {/* {errorFields.zip} */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Email</Form.Label>
                                        <Form.Control
                                           // style={{ border: errorFields?.email ? "2px solid red" : "" }}
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            //value={fields.email}
                                            //onChange={(event) => _handleChange(event)} 
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {/* {errorFields.email} */}
                                        </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                           // style={{ border: errorFields?.phone ? "2px solid red" : "" }}
                                            name="phone"
                                            type="text"
                                            placeholder="Phone"
                                            //onChange={(event) => _handleChange(event)} 
                                            //value={fields.phone}
                                        />
                                        <Form.Text className="errorMsg" style={{ color: "red" }}>
                                            {/* {errorFields.phone} */}
                                        </Form.Text>
                                </Form.Group>
                            </Row>

                            <Row>
                                <h3 className="page-title font-style-bold mt-4 mb-3">
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