import React, { useEffect, useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";
import './CandidateMultiForm.css';
import { useDispatch } from "react-redux";
import _ from "lodash";
import {  submitCandidateData  } from "../../../actions/Candidate";


// creating functional component ans getting props from app.js and destucturing them
const StepSeven = (props) => {
   //creating error state for validation
  //console.log("props7 ",props)
  const [error, setError] = useState(false);
  const currentId = props.cdId;
  const dispatch = useDispatch(); 
  const [fields, setFields] = useState({
    accomplishment:"",
    additionalInfo: "",
    step:7
  });
  useEffect(() => {
    if(!_.isEmpty(props.handleFormData)){
      setFields({
        accomplishment:props?.handleFormData?.accomplishment,
        additionalInfo: props?.handleFormData?.additional_info,
        step:7
      })
    }
  }, []);
  const _handleChange = (event) => {
    let data = fields;
      data[event.target.name] = event.target.value;
      setFields({...data}) 
  }

    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    let postData = fields;
 
    if(currentId){
      dispatch(submitCandidateData(currentId, postData));
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
                        style={{ height: '150px' }}
                        name="accomplishment"
                        as="textarea"
                        value={fields.accomplishment}
                        placeholder="Any Accomplishments"
                        onChange={(event) => _handleChange(event)} 
                    />
                </Form.Group>
            </Row>
            <Row>
            <h3 className="page-title font-style-bold mt-4 mb-4">ADDITIONAL INFORMATION </h3>
                <Form.Group className="mb-2 col-md-12">
                <Form.Label>Content</Form.Label>
                    <Form.Control
                        style={{ height: '150px' }}
                        name="additionalInfo"
                        as="textarea"
                        placeholder="Additional information"
                        value={fields.additionalInfo}
                        onChange={(event) => _handleChange(event)} 
                    />
                </Form.Group>
            </Row>
            
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit"  onClick={props.prevStep} >
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