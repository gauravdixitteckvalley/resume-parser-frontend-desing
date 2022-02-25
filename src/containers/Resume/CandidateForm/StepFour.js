import React, { useEffect, useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import './CandidateMultiForm.css';
import _ from "lodash";
import {  submitCandidateData  } from "../../../actions/Candidate";
import validateCandidateForm  from "./CandidateFromValidation";


// creating functional component ans getting props from app.js and destucturing them
const StepFour = (props) => {
  const currentId = props.cdId;
   //creating error state for validation
  const [errors, setErrors] = useState(false);
  const [formValues, setFormValues] = useState([{ project_name: "", role:"", technologies:"", project_link:"", project_description : ""}])
  const dispatch = useDispatch(); 
  const [status,setStatus] =useState(true);

  const validateForm = (formValuesArray) => {
    let errors = [];
    let formIsValid = true;
    formValuesArray.map ( (fields, index) => {
        let error = {}
        if (!fields["project_name"] || fields["project_name"].trim() === '') {
            formIsValid = false;
            error["project_name"] = "*Please enter your Project Name.";
        }
    
        if (!fields["role"] || fields["role"].trim() === '') {
            formIsValid = false;
            error["role"] = "*Please enter your role in project.";
        }

        if (!fields["technologies"] || fields["technologies"].trim() === '') {
            formIsValid = false;
            error["technologies"] = "*Please enter project technologies.";
        }

        if (!fields["project_description"] || fields["project_description"].trim() === '') {
            formIsValid = false;
            error["project_description"] = "*Please enter project description.";
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

useEffect(() => {
    
    if(!_.isEmpty(props.handleFormData.project)){
       
        setFormValues(props.handleFormData.project)
        setStatus(false)
    }
}, []);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    let postData = formValues;    
    if (_validateForm()){
      
      if(currentId){
          dispatch(submitCandidateData(currentId, {project:postData,step:4}));
          setTimeout(function(){  props.nextStep(); }, 2000);
      }
    }
  };

  const addFormFields = () => {
    setFormValues([...formValues, { project_name: "", role:"", technologies:"", project_link:"", project_description : "" }])
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

  const _handleChange = (event,key) => {
    const { target } = event
    formValues[key][target.name] = target.value
    setFormValues([...formValues])
  };

  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">Project </h3>
        <p style={{fontSize: '13px'}}>Highlight 6-8 of you projects.</p>
          {/* <Form onSubmit={submitFormData} className="mt-4"> */}
          <Form onSubmit={submitFormData}>
            {formValues.map((index, key) => {
              return (
                <Row key={key}>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        style={{ border: errors[key]?.project_name ? "2px solid red" : "" }}
                        type="text"
                        name="project_name"
                        placeholder="Project Name"
                        value={index.project_name}
                        onChange={(event) => _handleChange(event,key)} 
                    />
                    {errors[key]?.project_name ? (
                        <Form.Text style={{ color: "red" }}>
                        { errors[key]?.project_name }
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        style={{ border: errors[key]?.role ? "2px solid red" : "" }}
                        type="text"
                        name="role"
                        placeholder="Project Role"
                        value={index.role}
                        onChange={(event) => _handleChange(event,key)} 
                    />
                    {errors[key]?.role ? (
                        <Form.Text style={{ color: "red" }}>
                        { errors[key]?.role }
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>Technologies</Form.Label>
                    <Form.Control
                        style={{ border: errors[key]?.technologies ? "2px solid red" : "" }}
                        type="text"
                        name="technologies"
                        placeholder="Project Technologies"
                        value={index.technologies}
                        onChange={(event) => _handleChange(event,key)} 
                    />
                    {errors[key]?.technologies ? (
                        <Form.Text style={{ color: "red" }}>
                        { errors[key]?.technologies }
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>Project Link</Form.Label>
                    <Form.Control
                        style={{ border: errors[key]?.project_link ? "2px solid red" : "" }}
                        type="text"
                        name="project_link"
                        placeholder="Project Link"
                        value={index.project_link}
                        onChange={(event) => _handleChange(event,key)} 
                    />
                    {errors[key]?.project_link ? (
                        <Form.Text style={{ color: "red" }}>
                        { errors[key]?.project_link }
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>  
                <Form.Group className="mb-2 col-md-12">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        style={{ border: errors[key]?.project_description ? "2px solid red" : "",height: '150px' }}
                        name="project_description"
                        as="textarea"
                        placeholder="Describe Your Project"
                        value={index.project_description}
                        onChange={(event) => _handleChange(event, key)}
                    />
                    {errors[key]?.project_description ? (
                        <Form.Text style={{ color: "red" }}>
                        { errors[key]?.project_description }
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group> 
                {/* {
                  index ? 
                  <div className="icons-list col-md-1 candidate-del" style={{borderBottom: '0 !important', borderRight: '0 !important', padding: '0 !important'}}>
                      <Link to="#" onClick={(event) => removeFormFields(event, key)}>
                          <i className="mdi mdi-delete"></i>
                      </Link>
                  </div>
                  : null
                }                   */}
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
              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" onClick={props.prevStep} >
                Previous
              </Button>

              <Button className= "btn btn-gradient-primary mt-4 mb-2"  type="submit" >
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepFour;