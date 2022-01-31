import React, { useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";

import './CandidateMultiForm.css';

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [error, setError] = useState(false);

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
    if (
        validator.isEmpty(values.employer) || 
        validator.isEmpty(values.emptitle) || 
        validator.isEmpty(values.empCity) || 
        validator.isEmpty(values.empState) ||
        validator.isEmpty(values.startDate) ||
        validator.isEmpty(values.startYear) ||
        validator.isEmpty(values.endDate) ||
        validator.isEmpty(values.endYear) ||
        validator.isEmpty(values.jd)
        )
        {
      setError(true);
    } else {
      nextStep();
    }
  };

  const addNewEntryHandler = (e) => {
    e.preventDefault();
    console.log('clicked');
  }

  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">EXPERIENCE </h3>
        <p style={{fontSize: '13px'}}>List your work experience, from the most recent to the oldest. Feel free to use out pre-written examples.</p>
          <Form onSubmit={submitFormData} className="mt-4">
              <Row>
                <Form.Group className="mb-2 col-md-6">
                <Form.Label>Employer</Form.Label>
                <Form.Control
                    style={{ border: error ? "2px solid red" : "" }}
                    type="text"
                    placeholder="eg. IBM"
                    onChange={handleFormData("employer")}
                />
                {error ? (
                    <Form.Text style={{ color: "red" }}>
                    This is a required field
                    </Form.Text>
                ) : (
                    ""
                )}
                </Form.Group>  
                <Form.Group className="mb-2 col-md-6">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                    style={{ border: error ? "2px solid red" : "" }}
                    type="text"
                    placeholder="eg. Engineer"
                    onChange={handleFormData("emptitle")}
                />
                {error ? (
                    <Form.Text style={{ color: "red" }}>
                    This is a required field
                    </Form.Text>
                ) : (
                    ""
                )}
                </Form.Group>                     
              </Row>
            <Row>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>City</Form.Label>
                    <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="empCity" defaultValue={values.empCity} onChange={handleFormData("empCity")}>
                        <option>Select city</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    {error ? (
                        <Form.Text style={{ color: "red" }}>
                        This is a required field
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>  
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>State</Form.Label>
                    <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="empState" defaultValue={values.empState} onChange={handleFormData("empState")}>
                        <option>Select state</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
                    {error ? (
                        <Form.Text style={{ color: "red" }}>
                        This is a required field
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group className="mb-2 col-md-6">
                    <Row>
                    <Form.Group className="mb-2 col-md-6">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="startDate" defaultValue={values.startDate} onChange={handleFormData("startDate")}>
                            <option>Month</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        {error ? (
                            <Form.Text style={{ color: "red" }}>
                            This is a required field
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2 col-md-6">
                        <Form.Label>Start Year</Form.Label>
                        <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="startYear" defaultValue={values.startYear} onChange={handleFormData("startYear")}>
                            <option>Year</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        {error ? (
                            <Form.Text style={{ color: "red" }}>
                            This is a required field
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </Form.Group>
                    </Row>
                </Form.Group>  
                <Form.Group className="mb-2 col-md-6">
                    <Row>
                    <Form.Group className="mb-2 col-md-6">
                        <Form.Label>End Date</Form.Label>
                        <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="endDate" defaultValue={values.endDate} onChange={handleFormData("endDate")}>
                            <option>Month</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        {error ? (
                            <Form.Text style={{ color: "red" }}>
                            This is a required field
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2 col-md-6">
                        <Form.Label>End Year</Form.Label>
                        <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="endYear" defaultValue={values.endYear} onChange={handleFormData("endYear")}>
                            <option>Year</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                        {error ? (
                            <Form.Text style={{ color: "red" }}>
                            This is a required field
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </Form.Group>
                    <Form.Group>
                        <Form.Check aria-label="Default select example" type="checkbox" className="my-check mt-1" label="I currently work here" name="currentWork" onChange={handleFormData("currentWork")} />
                    </Form.Group>
                    </Row>
                </Form.Group>  
            </Row>
            <Row>
                <Form.Group className="mb-2 col-md-12">
                <Form.Label>Job Description</Form.Label>
                    <Form.Control
                        style={{ border: error ? "2px solid red" : "", height: '150px' }}
                        name="jd"
                        defaultValue={values.jd}
                        as="textarea"
                        placeholder="Describe Your Job"
                        onChange={handleFormData("jd")}
                    />
                    {error ? (
                        <Form.Text style={{ color: "red" }}>
                        This is a required field
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>
            </Row>
            <hr className="mb-4"/>
            <Row>
            <Form.Group className="mb-2 col-md-6">

            </Form.Group>
            <Form.Group className="mb-2 col-md-6" style={{textAlign: 'right'}}>
                <Button className= "btn btn-gradient-primary btn-icon-text" onClick={addNewEntryHandler} type="submit">
                <span className="page-title-icon text-white me-2">
                    <i className="mdi mdi-plus-box"></i>
                </span>
                    Add More
                </Button>
            </Form.Group>
               
            </Row>
            <hr className="mb-4"/>
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" onClick={prevStep} >
                Previous
              </Button>

              <Button className= "btn btn-gradient-primary mt-4 mb-2" onClick={nextStep} type="submit" >
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepTwo;