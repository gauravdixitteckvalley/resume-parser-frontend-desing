import React, { useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";
import { Link } from "react-router-dom";
import './CandidateMultiForm.css';


// creating functional component ans getting props from app.js and destucturing them
const StepFive = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [errors, setErrors] = useState(false);
  const [formValues, setFormValues] = useState([{ language: "", langLevel : ""}])

  const validateForm = (formValuesArray) => {
    let errors = [];
    let formIsValid = true;

    formValuesArray.map ( (fields, index) => {
        let error = {}
        if (!fields["language"] || fields["language"].trim() === '') {
            formIsValid = false;
            error["language"] = "*Please enter your Language.";
        }
    
        if (!fields["langLevel"] || fields["langLevel"].trim() === '') {
            formIsValid = false;
            error["langLevel"] = "*Please select your Language Level.";
        }

        if(Object.keys(error).length > 0){
            errors[index]= error
        }
        
    })

    return {
        errors : errors,
        formIsValid : formIsValid
    };
  }

  /* validate form */
  const _validateForm = () => {
      let response = validateForm(formValues);
      setErrors(response.errors)
      return response.formIsValid;
  }

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
    if (_validateForm()){
      nextStep();
    }
  };

  const addFormFields = () => {
    setFormValues([...formValues, { language: "", langLevel: "" }])
  }

  const removeFormFields = (event, index) => {
    event.preventDefault()
    if(errors !== false){
      let newErrors = [...errors];
      newErrors.splice(index, 1);
      setFormValues(newErrors)
    }

    let newFormValues = [...formValues];
    newFormValues.splice(index, 1);
    setFormValues(newFormValues)
  }
  
  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">LANGUAGES </h3>
        <p style={{fontSize: '13px'}}>Add languages to your resume</p>
          <Form onSubmit={submitFormData} className="mt-4">
              {formValues.map((index, key) => {
                return (
                  <Row key={index}>
                    <Form.Group className="mb-2 col-md-6">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            style={{ border: errors[key]?.language ? "2px solid red" : "" }}
                            type="text"
                            placeholder="eg. Spanish"
                            name="language"
                            onChange={handleFormData("language")}
                        />
                        {errors[key]?.language ? (
                            <Form.Text style={{ color: "red" }}>
                              { errors[key]?.language}
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </Form.Group>  
                    <Form.Group className="mb-2 col-md-5">
                        <Form.Label>Level</Form.Label>
                        <Form.Select 
                          aria-label="Default select example" 
                          style={{ border: errors[key]?.langLevel ? "2px solid red" : "" }} 
                          name="langLevel" 
                          defaultValue={values.langLevel} 
                          onChange={handleFormData("langLevel")} 
                        >
                            <option>Select your language level</option>
                            <option value="1">Basic</option>
                            <option value="2">Proficient</option>
                            <option value="3">Conversational</option>
                            <option value="3">Fluent</option>
                            <option value="3">Native speaker</option>
                        </Form.Select>
                        {errors[key]?.langLevel ? (
                            <Form.Text style={{ color: "red" }}>
                              { errors[key]?.langLevel}
                            </Form.Text>
                        ) : (
                            ""
                        )}
                    </Form.Group> 
                    {
                      index ? 
                      <div className="icons-list col-md-1 candidate-del" style={{borderBottom: '0 !important', borderRight: '0 !important', padding: '0 !important'}}>
                          <Link to="#" onClick={(event) => removeFormFields(event, key)}>
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

              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" >
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