import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Card, Button, Row } from "react-bootstrap";
import './CandidateMultiForm.css';
import _ from "lodash";
import {  getStateList } from "../../../actions/Resume"
import {  submitCandidateData  } from "../../../actions/Candidate";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = (props) => {
    
    const currentId = props.cdId;
    const [formValues, setFormValues] = useState([])
    const resumeData = useSelector(state => state.resume );
    const [error, setError] = useState(false);
  //fetch data from store
    const { countryList, stateList } = resumeData;
    const [status,setStatus] =useState(true);
    const dispatch = useDispatch(); 

// after form submit validating the form data using validator
  
  useEffect(() => {
        if(formValues.length<1){
            if(!_.isEmpty(props.handleFormData)){
                console.log("props.handleFormData " ,props.handleFormData)
                    setFormValues([...formValues, props.handleFormData.workExperience])
                    setStatus(false)
                }else{
                    setFormValues([...formValues, { 
                        employer: "", 
                        emptitle: " demo ",  
                        country: "",
                        stateName: "",
                        stateId: null,
                        stateArray: null,
                        isStateFilled: false,
                        city: "",  
                        startDate: "",  
                        endDate: "", 
                        currentWork: "", 
                        jd: "", 
                    }])
                }
            
        }
        console.log("formValues ", formValues)
        
  }, []);
  const _handleChange = (event,key ) => {
      const { target } = event
      const state = `state${key}`
      if(target.name  === state){
            const splitValue = target.value.match(/^(\S+)\s(.*)/).slice(1)
            formValues[key][state] = splitValue[1]
            formValues[key].stateId = splitValue[0]
            formValues[key].stateArray = stateList
            formValues[key].isStateFilled = true
      }else{
        formValues[key][target.name] = target.value
        console.log("check ",formValues[key][target.name] = target.value)
      }

    if(target.name === 'country'){
        if(formValues[key].stateArray !== null){
            formValues[key].stateName = ""
            formValues[key].stateId = null
            formValues[key].stateArray = null
            formValues[key].isStateFilled = false
        }
        let countryid = target.value;
        dispatch(getStateList(countryid));    
    }
    setFormValues([...formValues])
  }
  const addFormFields = () => {
    setFormValues([...formValues, { employer: "", 
                                    emptitle: "",  
                                    country: "",
                                    stateName: "",
                                    stateId: null,
                                    stateArray: null,
                                    city: "",  
                                    startDate: "", 
                                    endDate: "", 
                                    currentWork: "", 
                                    jd: "", 
                                }])
  }

  const selectStateOrCountryOption = (formValues, optionsArray, formValuesKey) => {
    const stateName = `state${formValuesKey}`
    if(formValues[formValuesKey].isStateFilled){
        const resumeListSelectedCountry = formValues[formValuesKey].stateArray
        return resumeListSelectedCountry.map ( (state, index) => {
        return (
            <>
                <option key={index} value={ formValues[formValuesKey][stateName] !== "" ? formValues[formValuesKey][stateName] === state.name ? 'selected' : `${state._id} ${state.name}` : `${state._id} ${state.name}` }>{state.name}</option>
            </>
        )
    })
    }else{
        if(formValues[formValuesKey].country !== ""){
        return optionsArray.map ( (state, index) => {
            return (
                <>
                    <option key={index} value={ `${state._id} ${state.name}` }>{state.name}</option>
                </>
            )
        })
        
        }
    
    }
    
  }
  const submitFormData = (event) => {
    /*console.log(formValues, " formValues")
    console.log(event.target.name, " ", event.target.value , " event")
    console.log("valid ", postData)
    */
    event.preventDefault();
    let postData = {"workExperience":formValues,step:2};
    if (!_.isEmpty(postData)) {       
        //let postData = fields;
        console.log("valid ")
        if(currentId){
            dispatch(submitCandidateData(currentId, postData));
            setTimeout(function(){  props.nextStep(); }, 2000);
        }
    }
    /*if(currentId){
        dispatch(submitCandidateData(currentId, postData));
        setTimeout(function(){  props.nextStep(); }, 2000);
       console.log("valid ")
    }*/
  //props.nextStep();
};
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
                                    value={formValues[key][key].employer}
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
                                    name={ `state${key}` } 
                                    onChange={(event) => _handleChange(event,key)}
                                >
                                    <option value="">Select State</option>
                                    {   selectStateOrCountryOption(formValues, stateList, key) }
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-2 col-md-4">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    name="city" 
                                    type="text"
                                    onChange={(event) => _handleChange(event,key)}
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
                                        onChange={(event) => _handleChange(event,key)}
                                    />
                                </Form.Group>
                               
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="endDate"
                                        placeholder="End Date"
                                        onChange={(event) => _handleChange(event,key)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-6"></Form.Group>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Check aria-label="Default select example" 
                                        type="checkbox" 
                                        className="my-check mt-1" 
                                        label="I currently work here" 
                                        name="currentWork" 
                                        onChange={(event) => _handleChange(event,key)}
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
                                    onChange={(event) => _handleChange(event,key)}
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
              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" onClick={props.prevStep} >
                Previous
              </Button>

              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit"  >
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