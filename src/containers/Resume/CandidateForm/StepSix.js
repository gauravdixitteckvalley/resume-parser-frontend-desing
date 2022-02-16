import React, {useEffect, useState } from "react";
import { Form, Card, Button, Row } from "react-bootstrap";
import './CandidateMultiForm.css';
import { useDispatch } from "react-redux";
import _ from "lodash";
import {  submitCandidateData  } from "../../../actions/Candidate";

// creating functional component ans getting props from app.js and destucturing them
const StepSix = (props) => {
  console.log("props ",props)
  const currentId = props.cdId;
  const dispatch = useDispatch(); 
  const [fields, setFields] = useState({
    award:"",
    publication: "",
    step:6
  });
 useEffect(() => {
    setFields({
        award:props?.handleFormData?.award,
        publication: props?.handleFormData?.publication,
        step:6
    })
  }, []);
  const _handleChange = (event) => {
    event.preventDefault();
    let data = fields;
      data[event.target.name] = event.target.value;
      setFields({...data}) 
  }

  const submitFormData = (e) => {
    e.preventDefault();
    let postData = fields;
    if(currentId){
      dispatch(submitCandidateData(currentId, postData));
      setTimeout(function(){  props.nextStep(); }, 2000); 
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Form onSubmit={submitFormData} >
          <Row>
          <h3 className="page-title font-style-bold mb-4">AWARDS </h3>
                <Form.Group className="mb-2 col-md-12">
                <Form.Label>Content</Form.Label>
                    <Form.Control
                        style={{ height: '150px' }}
                        name="award"
                        as="textarea"
                        //value={fields.award ? fields.award:''}
                        value={fields.award ? fields.award : props?.handleFormData?.award}
                        placeholder="Any Awards"
                        onChange={(event) => _handleChange(event)} 
                    />
                    
                </Form.Group>
            </Row>
            <Row>
            <h3 className="page-title font-style-bold mt-4 mb-4">PUBLICATIONS </h3>
                <Form.Group className="mb-2 col-md-12">
                <Form.Label>Content</Form.Label>
                    <Form.Control
                        style={{ height: '150px' }}
                        name="publication"
                        as="textarea"
                        placeholder="Any Publications"
                        value={fields.publication ? fields.publication : props?.handleFormData?.publication}
                        onChange={(event) => _handleChange(event)} 
                    />
                </Form.Group>
            </Row>
            
            
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit"  onClick={props.prevStep} >
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

export default StepSix;