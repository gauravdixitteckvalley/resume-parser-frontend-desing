import React, { useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";


// creating functional component ans getting props from app.js and destucturing them
const StepThree = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState([{ schoolName: "", schoolCity: "", schoolState: "", degree: "", studyField: "", gradMonth: "", gradYear: "", currentWork: "" }])

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
    if (
        validator.isEmpty(values.schoolName) || 
        validator.isEmpty(values.schoolCity) || 
        validator.isEmpty(values.schoolState) ||
        validator.isEmpty(values.degree) ||
        validator.isEmpty(values.studyField) ||
        validator.isEmpty(values.gradMonth) ||
        validator.isEmpty(values.gradYear)
        )
        {
      setError(true);
    } else {
      nextStep();
    }
  };

  const addFormFields = () => {
    setFormValues([...formValues, { schoolName: "", schoolCity: "", schoolState: "", degree: "", studyField: "", gradMonth: "", gradYear: "", currentWork: "", }])
  }

  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">EDUCATION </h3>
        <p style={{fontSize: '13px'}}>Add more about your educational background.</p>
          <Form onSubmit={submitFormData} className="mt-4">
              {formValues.map((index) => {
                  return (
                    <div key={index}>
                        <Row>
                            <Form.Group className="mb-2 col-md-6">
                                <Form.Label>School/College Name</Form.Label>
                                <Form.Control
                                    style={{ border: error ? "2px solid red" : "" }}
                                    type="text"
                                    placeholder="School/College Name"
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
                                <Form.Label>Select a degree</Form.Label>
                                <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="degree"  >
                                    <option>Select a degree</option>
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
                            <Form.Group className="mb-2 col-md-4">
                                <Form.Label>Country</Form.Label>
                                <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="country" >
                                    <option>Open this select menu</option>
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
                            <Form.Group className="mb-2 col-md-4">
                                <Form.Label>State</Form.Label>
                                <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="state" >
                                    <option>Open this select menu</option>
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
                            <Form.Group className="mb-2 col-md-4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    style={{ border: error ? "2px solid red" : "" }}
                                    name="city" 
                                    type="text"
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
                                    <Form.Label>Field of study</Form.Label>
                                        <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        type="text"
                                        placeholder="eg. Engineering"
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
                                <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Graduation month</Form.Label>
                                    <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="gradMonth" >
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
                                    <Form.Label>Graduation year</Form.Label>
                                    <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="gradYear" >
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
                                    <Form.Check 
                                        aria-label="Default select example" 
                                        type="checkbox" 
                                        className="my-check mt-1" 
                                        label="I presently attend here" 
                                        name="currentWork" 
                                    />
                                </Form.Group>
                                </Row>
                            </Form.Group>  
                        </Row>
                        
                        <hr className="mb-4"/> 
                    </div>
                  )
              })}
              
            <Row>
            <Form.Group className="mb-2 col-md-6">

            </Form.Group>
            <Form.Group className="mb-2 col-md-6" style={{textAlign: 'right'}}>
                <Button className= "btn btn-gradient-primary btn-icon-text" onClick={() => addFormFields()} type="button">
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

export default StepThree;