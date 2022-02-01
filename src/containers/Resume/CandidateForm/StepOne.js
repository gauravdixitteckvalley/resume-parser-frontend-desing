import React, { useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({ nextStep, handleFormData, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.firstName) ||
      validator.isEmpty(values.lastName) ||
      validator.isEmpty(values.email) ||
      validator.isEmpty(values.location) ||
      validator.isEmpty(values.city) ||
      validator.isEmpty(values.zip) ||
      validator.isEmpty(values.country) ||
      validator.isEmpty(values.email) ||
      validator.isEmpty(values.phone) 
    ) {
      setError(true);
    } else {
      nextStep();
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
                                    style={{ border: error ? "2px solid red" : "" }}
                                    name="firstName"
                                    defaultValue={values.firstName}
                                    type="text"
                                    placeholder="First Name"
                                    onChange={handleFormData("firstName")}
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
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    style={{ border: error ? "2px solid red" : "" }}
                                    name="lastName"
                                    defaultValue={values.lastName}
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={handleFormData("lastName")}
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
                                <Form.Group className="mb-2 col-md-12">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    style={{ border: error ? "2px solid red" : "" }}
                                    name="location"
                                    defaultValue={values.location}
                                    as="textarea"
                                    placeholder="Address"
                                    onChange={handleFormData("location")}
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
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="city" defaultValue={values.city} onChange={handleFormData("city")}>
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
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        style={{ border: error ? "2px solid red" : "" }}
                                        name="zip"
                                        defaultValue={values.zip}
                                        type="text"
                                        placeholder="Zip Code"
                                        onChange={handleFormData("zip")}
                                    />
                                    {error ? (
                                        <Form.Text style={{ color: "red" }}>
                                        This is a required field
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="country" defaultValue={values.country} onChange={handleFormData("country")}>
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
                            </Row>
                            <Row>
                                <Form.Group className="mb-3 col-md-6">
                                    <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            style={{ border: error ? "2px solid red" : "" }}
                                            name="lastName"
                                            defaultValue={values.email}
                                            type="email"
                                            placeholder="Email"
                                            onChange={handleFormData("email")}
                                        />
                                        {error ? (
                                            <Form.Text style={{ color: "red" }}>
                                            This is a required field
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )}
                                </Form.Group>
                                <Form.Group className="mb-3 col-md-6">
                                    <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            style={{ border: error ? "2px solid red" : "" }}
                                            name="phone"
                                            defaultValue={values.phone}
                                            type="text"
                                            placeholder="Phone"
                                            onChange={handleFormData("phone")}
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