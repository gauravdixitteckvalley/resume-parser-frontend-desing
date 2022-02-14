import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";
import { Link } from "react-router-dom";
import './CandidateMultiForm.css';
import _ from "lodash";
import {  submitCandidateData  } from "../../../actions/Candidate";
import validateCandidateForm  from "./CandidateFromValidation";


// creating functional component ans getting props from app.js and destucturing them
const StepFive = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState([{ language: "", langLevel : ""}])

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
    if (
        validator.isEmpty(values.language) || 
        validator.isEmpty(values.langLevel) 
        )
        {
      setError(true);
    } else {
      nextStep();
    }
  };

  const addFormFields = () => {
    setFormValues([...formValues, { language: "", langLevel: "" }])
  }

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
  }
  
  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">LANGUAGES </h3>
        <p style={{fontSize: '13px'}}>Add languages to your resume</p>
          <Form onSubmit={submitFormData} className="mt-4">
              {formValues.map((index) => {
                return (
                  <Row key={index}>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        style={{ border: error ? "2px solid red" : "" }}
                        type="text"
                        placeholder="eg. Spanish"
                        name="language"
                        
                    />
                    {error ? (
                        <Form.Text style={{ color: "red" }}>
                        This is a required field
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>  
                <Form.Group className="mb-2 col-md-5">
                    <Form.Label>Level</Form.Label>
                    <Form.Select aria-label="Default select example" style={{ border: error ? "2px solid red" : "" }} name="langLevel" >
                        <option>Select your language level</option>
                        <option value="1">Basic</option>
                        <option value="2">Proficient</option>
                        <option value="3">Conversational</option>
                        <option value="3">Fluent</option>
                        <option value="3">Native speaker</option>
                    </Form.Select>
                    {error ? (
                        <Form.Text style={{ color: "red" }}>
                        This is a required field
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group> 
                {
                  index ? 
                  <div className="icons-list col-md-1 candidate-del" style={{borderBottom: '0 !important', borderRight: '0 !important', padding: '0 !important'}}>
                      <Link to="#" onClick={() => removeFormFields(index)}>
                          <i class="mdi mdi-delete"></i>
                      </Link>
                  </div>
                  : null
                }                  
              </Row>
                )
              })}
             
            <hr className="mb-4"/> 
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

export default StepFive;