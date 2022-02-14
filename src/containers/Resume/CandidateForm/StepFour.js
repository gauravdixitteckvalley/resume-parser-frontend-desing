import React, { useEffect, useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import { Link } from "react-router-dom";
import './CandidateMultiForm.css';
import _ from "lodash";
import {  submitCandidateData  } from "../../../actions/Candidate";
import validateCandidateForm  from "./CandidateFromValidation";


// creating functional component ans getting props from app.js and destucturing them
const StepFour = (props) => {
  const currentId = props.cdId;
   //creating error state for validation
  const [error, setError] = useState(false);
  const [errorFields, setErrorFields] = useState([{skill: "", skillLevel : ""}]);
  const [formValues, setFormValues] = useState([{ skill: "", skillLevel : ""}])
let errorCheck = true;
  const addFormFields = () => {
    setFormValues([...formValues, { skill: "", skillLevel: "" }])
    setErrorFields([...errorFields, { skill: "", skillLevel: "" }])
  }

  const removeFormFields = (i) => {
    let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
  }
  const _handleChange = (event,key) => {
    console.log("key ",key)
    console.log("event.target.name ",event.target.name," event.target.value ",event.target.value)
    if(formValues[key]){
      if(event.target.name == "skill"){
        formValues[key] = {
          ...formValues[key],
          skill:event.target.value,
        }
      }
      if(event.target.name == "skillLevel"){
        formValues[key] = {
          ...formValues[key],
          skillLevel:event.target.value,
        }
      }
    }
    //console.log("formValues ",formValues)
};
const _validateForm = () => {
  let formNumber = "form4";
  let formFields = formValues;
 // let response = validateCandidateForm(formNumber,formFields,errorFields);
 formValues.map((index,key)=>{
    if(formValues[key].skill == ""){
      errorCheck = false;
      errorFields[key]={
        skill: "* Please Enter your skill. ",
        skillLevel:errorFields[key].skillLevel
      } 
    }else{
      errorFields[key]={
        skill: "",
        skillLevel:errorFields[key].skillLevel
      } 
    }
    if(formValues[key].skillLevel == ""){
      errorCheck = false;
      errorFields[key]={
        skill: errorFields[key].skill,
        skillLevel:"* Please select your skill level. "
      } 
    }else{
      errorFields[key]={
        skill: errorFields[key].skill,
        skillLevel:"* Please select your skill level. "
      } 
    }
 })
 console.log("errorFields ",errorFields)
  //setErrorFields(response.errorFields);
  //return response.formIsValid;
};
const submitFormData = (e) => {
 // props.nextStep()
  e.preventDefault();
  if (_validateForm()) {

  }
};

  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">SKILLS </h3>
        <p style={{fontSize: '13px'}}>Highlight 6-8 of you top skills.</p>
          {/* <Form onSubmit={submitFormData} className="mt-4"> */}
          <Form onSubmit={submitFormData}>
            {formValues.map((index, key) => {
              return (
                <Row key={key}>
                <Form.Group className="mb-2 col-md-6">
                    <Form.Label>Skill</Form.Label>
                    <Form.Control
                        style={{ border: error ? "2px solid red" : "" }}
                        type="text"
                        placeholder="Skills"
                        name="skill"
                        onChange={(event) => _handleChange(event,key)} 
                    />
                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                      {errorFields[key].skill}
                    </Form.Text>
                </Form.Group>  
                <Form.Group className="mb-2 col-md-5">
                    <Form.Label>Level</Form.Label>
                    <Form.Select 
                      aria-label="Default select example" 
                      style={{ border: error ? "2px solid red" : "" }} 
                      name="skillLevel" 
                      onChange={(event) => _handleChange(event,key)}
                    >
                        <option value=''>Select your skill level</option>
                        <option value="Novice">Novice</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Skillful">Skillful</option>
                        <option value="Experienced">Experienced</option>
                        <option value="Expert">Expert</option>
                        <option value="Don't show level">Don't show level</option>
                    </Form.Select>
                    <Form.Text className="errorMsg" style={{ color: "red" }}>
                      {errorFields[key].skillLevel}
                    </Form.Text>
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