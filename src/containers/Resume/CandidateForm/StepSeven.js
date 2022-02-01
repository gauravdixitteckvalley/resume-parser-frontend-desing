import React, { useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";
import './CandidateMultiForm.css';


// creating functional component ans getting props from app.js and destucturing them
const StepSeven = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [error, setError] = useState(false);

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
    if (
        validator.isEmpty(values.accomplishments) || 
        validator.isEmpty(values.additionalInfo) 
        )
        {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={submitFormData} >
          <Row>
          <h3 className="page-title font-style-bold mb-4">ACCOMPLISHMENTS </h3>
                <Form.Group className="mb-2 col-md-12">
                <Form.Label>Content</Form.Label>
                    <Form.Control
                        style={{ border: error ? "2px solid red" : "", height: '150px' }}
                        name="accomplishments"
                        defaultValue={values.accomplishments}
                        as="textarea"
                        placeholder="Any Accomplishments"
                        onChange={handleFormData("accomplishments")}
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
            <h3 className="page-title font-style-bold mt-4 mb-4">ADDITIONAL INFORMATION </h3>
                <Form.Group className="mb-2 col-md-12">
                <Form.Label>Content</Form.Label>
                    <Form.Control
                        style={{ border: error ? "2px solid red" : "", height: '150px' }}
                        name="additionalInfo"
                        defaultValue={values.additionalInfo}
                        as="textarea"
                        placeholder="Additional information"
                        onChange={handleFormData("additionalInfo")}
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
            
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" onClick={prevStep} >
                Previous
              </Button>

              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" >
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepSeven;