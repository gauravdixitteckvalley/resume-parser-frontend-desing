import React, { Fragment, useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Card, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import './CandidateMultiForm.css';
import _ from "lodash";
import {  getStateList } from "../../../actions/Resume"
import {  submitCandidateData  } from "../../../actions/Candidate";

// creating functional component ans getting props from app.js and destucturing them
const StepTwo = (props) => {
    const currentId = props.cdId;
    const [formValues, setFormValues] = useState([])
    const resumeData = useSelector(state => state.resume );
    const [errors, setErrors] = useState(false);

    //fetch data from store
    const { countryList, stateList } = resumeData;
    const dispatch = useDispatch(); 

    useEffect(() => {

        if(!_.isEmpty(props.handleFormData)){
            let string  = false ;
            let  propsData =  props.handleFormData.workExperience;
            propsData.map((ppData)=>{
                if(typeof(ppData) == 'string'){
                    string = true 
                }
            })
            
            if(props.handleFormData.workExperience.length >0 && formValues.length === 0  && string === false){
                setFormValues(props.handleFormData.workExperience)
            }
            else if(formValues.length === 0){
                setFormValues([...formValues, { 
                    employer: "", 
                    emptitle: "",  
                    country: "",
                    stateId: null,
                    stateArray: null,
                    isStateFilled: false,
                    city: "",  
                    startDate: "",  
                    endDate: "", 
                    currentWork: false, 
                    jd: "", 
                }])
            }
        }
            
    }, []);

    // after form submit validating the form data using validator
    const submitFormData = (event) => {
        event.preventDefault();
        let postData = formValues;
       
        if(currentId){
            dispatch(submitCandidateData(currentId, {workExperience:postData,step:2}));
            setTimeout(function(){  props.nextStep(); }, 2000);
        }
    };

    

    const _handleChange = (event,key ) => {
        const { target } = event
        const state = `state${key}`
        if(target.name  === state){
                const splitValue = target.value.match(/^(\S+)\s(.*)/).slice(1)
                formValues[key][state] = splitValue[1]
                formValues[key].stateId = splitValue[0]
                formValues[key].stateArray = stateList
                formValues[key].isStateFilled = true
        }
        else{
            formValues[key][target.name] = target.value  
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
                                        stateId: null,
                                        stateArray: null,
                                        city: "",  
                                        startDate: "", 
                                        endDate: "", 
                                        currentWork: false, 
                                        jd: "", 
                                    }])
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

    const selectStateOrCountryOption = (formValues, optionsArray, formValuesKey,selectedState) => {
        const stateName = `state${formValuesKey}`
        if(formValues[formValuesKey].isStateFilled){
            const resumeListSelectedCountry = formValues[formValuesKey].stateArray
            return resumeListSelectedCountry.map ( (state, index) => {
            return (
                <Fragment key={`with-selecting-${index}`}>
                    <option 
                        value={ `${state._id} ${state.name}` }
                        //selected={selectedState-1 == index ? true :false }
                    >{state.name} </option>
                </Fragment>
            )
        })
        }else{
            if(formValues[formValuesKey].country !== ""){
            return optionsArray.map ( (state, index) => {
                return (
                    <Fragment key={`without-selecting-${index}`}>
                        <option
                            value={ `${state._id} ${state.name}` }
                            //selected={selectedState-1 == index ? true :false }
                        >{state.name}</option>
                    </Fragment>
                )
            })
            
            }
        
        }
        
    }

    return (
        <>
        <Card>
            <Card.Body>
            <h3 className="page-title font-style-bold mb-2">
                <span className="page-title-icon bg-gradient-primary text-white me-2">
                  <i className="mdi mdi-checkbox-marked"></i>
                </span>
                EXPERIENCE 
            </h3>
            <p style={{fontSize: '13px'}}>List your work experience, from the most recent to the oldest. Feel free to use out pre-written examples.</p>
            <Form onSubmit={submitFormData} className="mt-4">
            
                {formValues.map((index, key) => {
                    const stateName = `state${key}`
                    return(
                        <div key={key}>
                            
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Employer </Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{ border: errors[key]?.employer ? "2px solid red" : "" }}
                                        placeholder="eg. IBM"
                                        name="employer"
                                        value={index.employer}
                                        onChange={(event) => _handleChange(event,key)}
                                    />
                                    {/* {errors[key]?.employer ? (
                                        <Form.Text style={{ color: "red" }}>
                                        { errors[key]?.employer }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )} */}
                                </Form.Group>  
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        style={{ border: errors[key]?.emptitle ? "2px solid red" : "" }}
                                        placeholder="eg. Engineer"
                                        name="emptitle"
                                        value={index.emptitle}
                                        onChange={(event) => _handleChange(event,key)}
                                    />
                                    {/* {errors[key]?.emptitle ? (
                                        <Form.Text style={{ color: "red" }}>
                                        { errors[key]?.emptitle }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )} */}
                                </Form.Group>                     
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select aria-label="Default select example" 
                                        name="country" 
                                        style={{ border: errors[key]?.country ? "2px solid red" : "" }}
                                        onChange={(event) => _handleChange(event,key)}
                                        value={ index.country }
                                    >
                                        <option value="">Select Country</option>
                                        
                                        {countryList?.map((country, key) => (
                                            <option 
                                                key={`country-${key}`} 
                                                value={country._id}>{country.name}</option>
                                        ))}
                                    </Form.Select>
                                    {/* {errors[key]?.country ? (
                                        <Form.Text style={{ color: "red" }}>
                                        { errors[key]?.country }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )} */}
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select aria-label="Default select example" 
                                        name={ stateName } 
                                        style={{ border: errors[key]?.[`state${key}`] ? "2px solid red" : "" }}
                                        onChange={(event) => _handleChange(event,key)}
                                        value={ `${formValues[key]?.stateId} ${formValues[key]?.[stateName]}`}
                                    >
                                        <option value="">Select State</option>
                                        {   selectStateOrCountryOption(formValues, stateList, key,index.stateId) }
                                    </Form.Select>
                                    {/* {errors[key]?.[`state${key}`] ? (
                                        <Form.Text style={{ color: "red" }}>
                                        { errors[key]?.[`state${key}`] }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )} */}
                                </Form.Group>
                                <Form.Group className="mb-2 col-md-4">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        name="city" 
                                        style={{ border: errors[key]?.city ? "2px solid red" : "" }}
                                        type="text"
                                        onChange={(event) => _handleChange(event, key)}
                                        value={index.city}
                                    />
                                    {/* {errors[key]?.city ? (
                                        <Form.Text style={{ color: "red" }}>
                                        { errors[key]?.city }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )} */}
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-2 col-md-6">
                                    <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            style={{ border: errors[key]?.startDate ? "2px solid red" : "" }}
                                            name="startDate"
                                            placeholder="Start Date"
                                            onChange={(event) => _handleChange(event,key)}
                                            value={index.startDate}
                                        />
                                        {/* {errors[key]?.startDate ? (
                                            <Form.Text style={{ color: "red" }}>
                                            { errors[key]?.startDate }
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )} */}
                                    </Form.Group>
                                
                                    <Form.Group className="mb-2 col-md-6">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            style={{ border: errors[key]?.endDate ? "2px solid red" : "" }}
                                            name="endDate"
                                            placeholder="End Date"
                                            value={index.endDate}
                                            onChange={(event) => _handleChange(event, key)}
                                        />
                                        {/* {errors[key]?.endDate ? (
                                            <Form.Text style={{ color: "red" }}>
                                            { errors[key]?.endDate }
                                            </Form.Text>
                                        ) : (
                                            ""
                                        )} */}
                                    </Form.Group>
                                    <Form.Group className="mb-2 col-md-6"></Form.Group>
                                    <Form.Group className="mb-2 col-md-6">
                                        <Form.Check aria-label="Default select example" 
                                            type="checkbox" 
                                            className="my-check mt-1" 
                                            label="I currently work here" 
                                            name="currentWork"
                                            checked={formValues[key].currentWork} 
                                            onChange={(event) => _handleChange(event, key)}
                                        />
                                    </Form.Group>
                                </Row>
                                
                            <Row>
                                <Form.Group className="mb-2 col-md-12">
                                <Form.Label>Job Description</Form.Label>
                                    <Form.Control
                                        style={{ height: '150px', border: errors[key]?.jd ? "2px solid red" : "" }}
                                        name="jd"
                                        as="textarea"
                                        placeholder="Describe Your Job"
                                        value={index.jd}
                                        onChange={(event) => _handleChange(event, key)}
                                    />
                                    {/* {errors[key]?.jd ? (
                                        <Form.Text style={{ color: "red" }}>
                                        { errors[key]?.jd }
                                        </Form.Text>
                                    ) : (
                                        ""
                                    )} */}
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