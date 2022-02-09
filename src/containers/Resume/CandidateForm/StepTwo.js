import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Card, Button, Row } from "react-bootstrap";
import validator from "validator";
import './CandidateMultiForm.css';
import _ from "lodash";
import {  getStateList } from "../../../actions/Resume"

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
   const [formValues, setFormValues] = useState([])
  const resumeData = useSelector(state => state.resume );
  const { countryList, stateList } = resumeData;
  //const[countryArray,setCountryArray] = useState()

  //console.log(countryArray, " countryArray")
  const [error, setError] = useState(false);
  const dispatch = useDispatch(); 
    // after form submit validating the form data using validator
  const submitFormData = (event) => {
      console.log(formValues, " formValues")
      console.log(event.target.name, " ", event.target.value , " event")
      event.preventDefault();
    nextStep();
  };
  useEffect(() => {
        if(formValues.length<1){
            setFormValues([...formValues, { 
                employer: "", 
                emptitle: " demo ",  
                country: "",
                state: "",
                city: "",  
                startDate: "",  
                endDate: "", 
                currentWork: "", 
                jd: "", 
            }])
        }
  }, []);
  const _handleChange = (event,key ) => {
   /* //formValues[0]{event.target.name:event.target.value};
      console.log(key, " key")
      console.log(formValues[0].event.target.name, " length")
      console.log(event.target.name, " event.target.name ",event.target.value, " event.target.value ")
    
      formValues[0]={event.target.name:event.target.value}
        
     
    let data = formValues; */
    //formValues[0]={event.target.name:event.target.value}
   //console.log("key ", key)
    if(event.target.name === 'country'){
        let countryid = event.target.value;
        dispatch(getStateList(countryid));    
    }

   /*event.target.name = event.target.value;
   
     // setFields({...data})
     */
  }
  const addFormFields = () => {
    setFormValues([...formValues, { employer: "", 
                                    emptitle: "",  
                                    country: "",
                                    state: "",
                                    city: "",  
                                    startDate: "", 
                                    endDate: "", 
                                    currentWork: "", 
                                    jd: "", 
                                }])
    //setCountryArray([...countryArray,countryArray])
  }

  return (
    <>
      <Card>
        <Card.Body>
        <h3 className="page-title font-style-bold mb-2">EXPERIENCE </h3>
        <p style={{fontSize: '13px'}}>List your work experience, from the most recent to the oldest. Feel free to use out pre-written examples.</p>
          <Form onSubmit={submitFormData} className="mt-4">
          
              {formValues.map((index, key) => {
                  return(
                    <div key={key}>
                        <Row>
                            <Form.Group className="mb-2 col-md-6">
                                <Form.Label>Employer </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="eg. IBM"
                                    name="employer"
                                    onChange={(event) => _handleChange(event,key)}
                                />
                            </Form.Group>  
                            <Form.Group className="mb-2 col-md-6">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="eg. Engineer"
                                    name="emptitle"
                                    onChange={(event) => _handleChange(event,key)}
                                />
                            </Form.Group>                     
                        </Row>
                        <Row>
                            <Form.Group className="mb-2 col-md-4">
                                <Form.Label>Country</Form.Label>
                                <Form.Select aria-label="Default select example" 
                                    name="country" 
                                     
                                    onChange={(event) => _handleChange(event,key)}
                                >
                                    <option value="">Select Country</option>
                                    
                                    {countryList?.map((country, index) => (
                                        <option key={index} value={country._id}>{country.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2 col-md-4">
                                <Form.Label>State</Form.Label>
                                <Form.Select aria-label="Default select example" 
                                    name="state" 
                                    onChange={(event) => _handleChange(event,key)}
                                >
                                    <option value="">Select State</option>
                                    {stateList?.map((state, index) => (
                                        <option key={index} value={state._id}>{state.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2 col-md-4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    name="city" 
                                    type="text"
                                    onChange={(event) => _handleChange(event)}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="mb-2 col-md-6">
                                <Form.Label>Start Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="startDate"
                                        placeholder="Start Date"
                                        onChange={(event) => _handleChange(event)}
                                    />
                                </Form.Group>
                               
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="endDate"
                                        placeholder="End Date"
                                        onChange={(event) => _handleChange(event)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6"></Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Check aria-label="Default select example" 
                                        type="checkbox" 
                                        className="my-check mt-1" 
                                        label="I currently work here" 
                                        name="currentWork" 
                                        onChange={(event) => _handleChange(event)}
                                    />
                                </Form.Group>
                            </Row>
                            
                        <Row>
                            <Form.Group className="mb-2 col-md-12">
                            <Form.Label>Job Description</Form.Label>
                                <Form.Control
                                    style={{ height: '150px' }}
                                    name="jd"
                                    as="textarea"
                                    placeholder="Describe Your Job"
                                    onChange={(event) => _handleChange(event)}
                                />
                            </Form.Group>
                        </Row>
                        <hr className="mb-4 mt-4"/>
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

export default StepTwo;