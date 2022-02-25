import React, { Fragment, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

import BlockUI from "../../../components/BlockUI";
import './SelectResume.css';

import { getCandidateList } from '../../../actions/Resume';
import {history} from '../../../utils/helper'


const SelectResume = () => {
    
    const [designerShow, setDesignerShow] = useState(false);
    const [developerShow, setDeveloperShow] = useState(false);
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});

    const messages = useSelector(state => state.resume);
    const { blocking, candidateList } = messages;
    const dispatch = useDispatch();
    useEffect(()=>{
        _getuserdata();
    },[]);

    const _getuserdata = () =>{
        dispatch(getCandidateList());
    }

    const _handleChange = (event) =>{
        event.preventDefault();
        let data = fields;
        data[event.target.name] = event.target.value;
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
        if (_validateForm()) {
            let redirectTo = 'designer-preview'
            if(fields.template ==="developer"){
                redirectTo = 'developer-preview'
            }
            // console.log('fields',fields);
            history.push({pathname : `/${redirectTo}`,state : { templateData : fields }}); 
        }    
    }

    return (
        <Fragment>
            <BlockUI blocking={blocking} /> 
            <div className="page-header">
              <h3 className="page-title">Select Resume</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-inline user-form" onSubmit={ event=>_handleSubmit(event) }>
                                <div className="row">
                                    <div className="col-md-12 mb-4">
                                        <label className="mb-3 required" for="inlineFormInputName2">Select Candidate</label>
                                        <Form.Control as="select" name="candidate_name" onChange={ event=>_handleChange(event)} > 
                                            <option value=''>Select Name</option> 
                                            { candidateList?.map((data,index)=>(
                                                <option value={data._id} >{data.name }</option>
                                                ))
                                            }
                                        </Form.Control>
                                        <div className="errorMsg">{errors.candidate_name}</div> 
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="mb-3 required" for="inlineFormInputName2">Employee Code</label>
                                            <input type="text" className="form-control" name="emp_code" onChange={ event=>_handleChange(event)} placeholder="TK-10758"/>
                                            <div className="errorMsg">{errors.emp_code}</div> 
                                        </div>
                                        <div className="col-md-6">
                                            <label className="mb-3 required" for="inlineFormInputName2">Title/Designation</label>
                                            <input type="text" className="form-control" name="emp_title" onChange={ event=>_handleChange(event)} placeholder="Software Engineer"/>
                                            <div className="errorMsg">{errors.emp_title}</div> 
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <label className="mb-1 required" for="inlineFormInputName2">Select Template</label><br />
                                        <div className="check-sec">
                                            <div className="form-check form-check-inline mt-2">
                                                <input className="form-check-input" type="radio" name="template" onChange={ event=>_handleChange(event)} id="inlineRadio1" value="designer" />
                                                <label className="form-check-label" for="template">Designer</label>
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
                                                <label className="form-check-label" for="template">Developer</label>
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