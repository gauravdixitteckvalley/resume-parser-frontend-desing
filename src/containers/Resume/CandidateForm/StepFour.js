import React, { useEffect, useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { Link } from "react-router-dom";

import './CandidateMultiForm.css';
import _ from "lodash";
import {  submitCandidateData, fetchSkillsList  } from "../../../actions/Candidate";
import validateCandidateForm  from "./CandidateFromValidation";


// creating functional component ans getting props from app.js and destucturing them
const StepFour = (props) => {
  const currentId = props.cdId;
   //creating error state for validation
  const [errors, setErrors] = useState(false);
  const [options, setOptions] = useState([])
  const [formValues, setFormValues] = useState([{ skill: "", skillLevel : ""}])
  const [status,setStatus] =useState(true);

  const { skills } = useSelector( (state) => state.candidate);
  const dispatch = useDispatch(); 
  console.log('skills', options)

  

  if(typeof skills != "undefined" && (_.size(skills) > 0))
        if (_.size(skills) !== _.size(options))
            setOptions([...skills])

  const validateForm = (formValuesArray) => {
    let errors = [];
    let formIsValid = true;
    formValuesArray.map ( (fields, index) => {
        let error = {}
        if (!fields["skill"] || fields["skill"].trim() === '') {
            formIsValid = false;
            error["skill"] = "*Please enter your School Name.";
        }
    
        if (!fields["skillLevel"] || fields["skillLevel"].trim() === '') {
            formIsValid = false;
            error["skillLevel"] = "*Please select your Skill Level.";
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
    //fetch skills list
    dispatch(fetchSkillsList({ search: ''}))

    if(!_.isEmpty(props.handleFormDataa)){
    setFormValues(props.handleFormData.skills)
    setStatus(false)
    }
}, []);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    let postData = formValues;    
    if (_validateForm()){
      //props.nextStep();
      //console.log("postData4 ",postData)
      if(currentId){
          dispatch(submitCandidateData(currentId, {skills:postData,step:4}));
          setTimeout(function(){  props.nextStep(); }, 2000);
      }
    }
  };

  const addFormFields = () => {
    setFormValues([...formValues, { skill: "", skillLevel: "" }])
  }

  //removing formValues object
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

  const _handleSkill = (event, key) => {
    // event.preventDefault()
    console.log(event[0])
    formValues[key]['skill'] = event[0].value
    formValues[key]['skillId'] = event[0]._id
    setFormValues([ ...formValues ])
  }

  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">
          <span className="page-title-icon bg-gradient-primary text-white me-2">
            <i className="mdi mdi-checkbox-marked"></i>
          </span>
          SKILLS 
        </h3>
        <p style={{fontSize: '13px'}}>Highlight 6-8 of you top skills.</p>
          {/* <Form onSubmit={submitFormData} className="mt-4"> */}
          <Form onSubmit={submitFormData}>
            {formValues?.map((index, key) => {
              return (
                <Row key={key}>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>Skill</Form.Label>
                    {/* <Form.Control
                        style={{ border: errors[key]?.skill ? "2px solid red" : "" }}
                        type="text"
                        name="skill"
                        placeholder="School Name"
                        value={index.skill}
                        onChange={(event) => _handleChange(event,key)} 
                    /> */}
                    <Select
                        placeholder={"Select Skills"}
                        options={options}
                        onChange={ event =>_handleSkill(event, key) }
                        value={console.log( 'skillvalue', index)}
                      />
                    {errors[key]?.skill ? (
                        <Form.Text style={{ color: "red" }}>
                        { errors[key]?.skill }
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group>  
                <Form.Group className="mb-2 col-md-5">
                    <Form.Label>Level</Form.Label>
                    <Form.Select 
                      aria-label="Default select example" 
                      style={{ border: errors[key]?.skillLevel ? "2px solid red" : "" }} 
                      name="skillLevel" 
                      onChange={(event) => _handleChange(event,key)} 
                    >
                        <option>Select your skill level</option>
                        <option 
                          value="Novice" 
                          selected={(index.skillLevel == "Novice") ? true :false }>
                            Novice
                        </option>
                        <option 
                          value="Beginner" 
                          selected={(index.skillLevel == "Beginner") ? true :false }>
                            Beginner
                        </option>
                        <option 
                          value="Skillful" 
                          selected={(index.skillLevel == "Skillful") ? true :false }>
                            Skillful
                        </option>
                        <option 
                          value="Experienced" 
                          selected={(index.skillLevel == "Experienced") ? true :false }>
                            Experienced
                        </option>
                        <option 
                          value="Expert" 
                          selected={(index.skillLevel == "Expert") ? true :false }>
                            Expert
                        </option>
                        <option 
                          value="- Don't show level" 
                          selected={(index.skillLevel == "- Don't show level") ? true :false }>
                            - Don't show level
                        </option>
                    </Form.Select>
                    {errors[key]?.skillLevel ? (
                        <Form.Text style={{ color: "red" }}>
                        { errors[key]?.skillLevel }
                        </Form.Text>
                    ) : (
                        ""
                    )}
                </Form.Group> 
                {
                  index ? 
                  <div className="icons-list col-md-1 candidate-del" style={{borderBottom: '0 !important', borderRight: '0 !important', padding: '0 !important'}}>
                      <Link to="#" onClick={(event) => removeFormFields(event, key)}>
                          <i className="mdi mdi-delete"></i>
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