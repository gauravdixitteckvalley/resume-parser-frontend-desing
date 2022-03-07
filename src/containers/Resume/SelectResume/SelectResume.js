import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import BlockUI from "../../../components/BlockUI";
import './SelectResume.css';

import { getCandidateList } from '../../../actions/Resume';
import {history, displayErrorMessage} from '../../../utils/helper'
import { data } from "jquery";


const SelectResume = () => {
    
    const [designerShow, setDesignerShow] = useState(false);
    const [developerShow, setDeveloperShow] = useState(false);
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [coreCompetencie, setCoreCompetencie] = useState([{ core_competencies: ""}]);

    const messages = useSelector(state => state.resume);
    const { blocking, candidateList } = messages;
    const dispatch = useDispatch();
    useEffect(()=>{
        _getuserdata();
    },[]);

    const _getuserdata = () =>{
        dispatch(getCandidateList());
    }

    const _create_core_competencie=()=>{
       
        return coreCompetencie.map((index, key) => 
            <div className="input-group mb-3" key={key}>
                <input type="text" className="form-control" value={index.core_competencies  } maxLength={80} name="core_competencies" onChange={ event=>_handleChange(event,key)} placeholder=""/>
                <div className="input-group-append">
                    <button className="btn btn-danger" onClick={event=>_remove_click(key)} type="button"><i className="mdi mdi-delete"></i></button>
                </div>
                 
            </div>          
        )  
    }
    const _add_core_competencie = () =>{
        if(coreCompetencie.length < 4 ){
            setCoreCompetencie([...coreCompetencie, { core_competencies: "" }])
        }else{
            displayErrorMessage('you can not add more the 4.')
        }
        
    }

    const _remove_click = (i) => {
        if(coreCompetencie.length>1){
            let newCoreCompetencie = [...coreCompetencie];
            newCoreCompetencie.splice(i, 1);
            setCoreCompetencie(newCoreCompetencie)
        }

     }

    const _handleChange = (event,key=null) =>{
        event.preventDefault();
        let data = fields;
        
        if(event.target.name === 'core_competencies'){
            
            coreCompetencie[key][event.target.name] = event.target.value
            let d = coreCompetencie.map(function( data){ return data.core_competencies})
            data[event.target.name]= d;
        }else{
            data[event.target.name] = event.target.value;
            
        }
        setFields({...data})
        
    }

    const validateForm = () => {
        
        let formIsValid = true;        
        let error = {}
        if (!fields["candidate_name"] || fields["candidate_name"].trim() === '') {
            formIsValid = false;
            error["candidate_name"] = "*Please select candidate.";
        }
    
        if (!fields["emp_code"] || fields["emp_code"].trim() === '') {
            formIsValid = false;
            error["emp_code"] = "*Please enter employee code.";
        }

        if (!fields["emp_title"] || fields["emp_title"].trim() === '') {
            formIsValid = false;
            error["emp_title"] = "*Please enter Title/Designation.";
        }

        if (!fields["template"] || fields["template"].trim() === '') {
            formIsValid = false;
            error["template"] = "*Please select template.";
        }
        
        if (!fields["tools"] || fields["tools"].trim() === '') {
            formIsValid = false;
            error["tools"] = "*Please select tools.";
        }

        if (!fields["webCompatibility"] || fields["webCompatibility"].trim() === '') {
            formIsValid = false;
            error["webCompatibility"] = "*Please enter your web compatibility.";
        }

        if (!fields["core_competencies"] || fields["core_competencies"].length === 0) {
           
            formIsValid = false;
            error["core_competencies"] = "*Please select core competencies.";
        }

        if(coreCompetencie.length > 0){
            let err = {}
            coreCompetencie.map((data,index)=>{
                
                if (data["core_competencies"].trim() === '') {
                    formIsValid = false;
                    err['core_competencies'] = 'Please select core competencies'
                } 
            })
            if(Object.keys(err).length > 0){
                error["core_competencies"] = 'Please select core competencies.'
            }
            
        }
        
        return {
            errors : error,
            formIsValid : formIsValid
        };
    }

    const _validateForm =() =>{
        let response = validateForm()
        setErrors(response.errors)
        return response.formIsValid;
    }

    const _handleSubmit = (event) => {
        event.preventDefault();
        if (true) {
            let redirectTo = 'designer-preview'
            if(fields.template ==="developer"){
                redirectTo = 'developer-preview'
            }
            
            const { webCompatibility } = fields
            const splitWebComp =  webCompatibility.split(",")
            if(splitWebComp.length > 1){
                let webCompatibilityValue = splitWebComp.join(" | ")
                fields.webCompatibility = webCompatibilityValue
                history.push({pathname : `/template/${redirectTo}`,state : { templateData : fields , coreCompetencie:coreCompetencie }}); 
            }
            
        }    
    }


    return (
        <Fragment>
            <BlockUI blocking={blocking} /> 
            <div className="page-header">
              <h3 className="page-title">Preview & Download Resume</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-inline user-form" onSubmit={ event=>_handleSubmit(event) }>
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <label className="mb-3 required" htmlFor="inlineFormInputName2">Select Candidate</label>
                                        <Form.Control as="select" name="candidate_name" onChange={ event=>_handleChange(event)} > 
                                            <option value=''>Select Name</option> 
                                            { candidateList?.map((data,index)=>(
                                                <option key={data._id} value={data._id} >{data.name }</option>
                                                ))
                                            }
                                        </Form.Control>
                                        <div className="errorMsg">{errors.candidate_name}</div> 
                                    </div>
                                    <div className="col-md-12 mb-4">
                                        <div className="row">
                                        <div className="col-md-6">
                                            <label className="mb-3 required" htmlFor="inlineFormInputName2">Employee Code</label>
                                            <input type="text" className="form-control" name="emp_code" onChange={ event=>_handleChange(event)} placeholder="TK-10758"/>
                                            <div className="errorMsg">{errors.emp_code}</div> 
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-3 required" htmlFor="inlineFormInputName2">Title/Designation</label>
                                            <input type="text" className="form-control" name="emp_title" onChange={ event=>_handleChange(event)} placeholder="Software Engineer"/>
                                            <div className="errorMsg">{errors.emp_title}</div> 
                                        </div>
                                        </div>
                                    </div>
                                    {/* <div className="row"> */}
                                    <div className="col-md-12 mb-4">
                                        <label className="mb-3 required" htmlFor="inlineFormInputName2">Tools</label>
                                        <input type="text" className="form-control" maxLength = {140} name="tools" onChange={ event=>_handleChange(event)} placeholder="Dreamweaver, Visual studio, Netbeans, Sublime, Slack"/>
                                        <div className="errorMsg">{errors.tools}</div> 
                                    </div>
                                    {/* </div> */}
                                    {/* <div className="row"> */}
                                    
                                    <div className="col-md-12 mb-4">
                                        <label className="mb-3 required" htmlFor="inlineFormInputName2">Web Compatibility</label>
                                            <input type="text" className="form-control" maxLength = {140} name="webCompatibility" onChange={ event=>_handleChange(event)} placeholder="LMS , CMS , Framework" />
                                        <div className="errorMsg">{errors.webCompatibility}</div> 
                                    </div>

                                    <div className="col-md-12 mb-4">
                                        <label className="mb-3 required" htmlFor="inlineFormInputName2">Core Competencies</label>
                                        {_create_core_competencie()}      
                                        {/* <input type='button ' className="btn col-md-2 btn-primary " value='add more' onClick={event=>_add_core_competencie(event)}/> */}
                                        <button type='button' className="btn col-md-2 btn-primary " onClick={event=>_add_core_competencie(event)}>add more</button>
                                        <div className="errorMsg">{errors.core_competencies}</div>
                                    </div>
                                    {/* </div> */}
                                    <div className="col-md-12 mt-4">
                                        <label className="mb-1 required" htmlFor="inlineFormInputName2">Select Template</label><br />
                                        <div className="check-sec">
                                            <div className="form-check form-check-inline mt-2">
                                                <input className="form-check-input" type="radio" name="template" onChange={ event=>_handleChange(event)} id="inlineRadio1" value="designer" />
                                                <label className="form-check-label" htmlFor="template">Designer</label>
                                                <img className="rounded" onClick={() => setDesignerShow(true)} src="./assets/img/designer-small.png" style={{width: '150px', cursor: 'pointer', marginTop: '10px'}}/>
                                                <Modal
                                                    show={designerShow}
                                                    onHide={() => setDesignerShow(false)}
                                                    dialogClassName="modal-90w designer-modal"
                                                    aria-labelledby="example-custom-modal-styling-title"
                                                >
                                                    <Modal.Header closeButton>
                                                    <Modal.Title id="example-custom-modal-styling-title">
                                                        Designer Template
                                                    </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                    <img src="./assets/img/designer-big.png" style={{width:'100%'}} />
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                            <div className="form-check form-check-inline mt-2">
                                                <input className="form-check-input" type="radio" name="template" onChange={ event=>_handleChange(event)} id="template" value="developer" />
                                                <label className="form-check-label" htmlFor="template">Developer</label>
                                                <img className="rounded" onClick={() => setDeveloperShow(true)} src="./assets/img/developer-small.png" style={{width: '150px', cursor: 'pointer', marginTop: '10px'}}/>
                                                <Modal
                                                    show={developerShow}
                                                    onHide={() => setDeveloperShow(false)}
                                                    dialogClassName="modal-90w designer-modal"
                                                    aria-labelledby="example-custom-modal-styling-title"
                                                    style={{maxWidth: '850px !important'}}
                                                >
                                                    <Modal.Header closeButton>
                                                    <Modal.Title id="example-custom-modal-styling-title">
                                                        Developer Template
                                                    </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                    <img src="./assets/img/developer-big.png" style={{width:'100%'}} />
                                                    </Modal.Body>
                                                </Modal>
                                            </div>
                                        </div>
                                        <div className="errorMsg">{errors.template}</div> 
                                    </div>
                                </div>
                                <hr className="mt-4"/>
                                {/* <Link to="./designer-preview"> */}
                                    <button type="submit" className="btn btn-gradient-primary mt-3 mb-2">Preview</button>
                                {/* </Link> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )

}    

export default SelectResume;