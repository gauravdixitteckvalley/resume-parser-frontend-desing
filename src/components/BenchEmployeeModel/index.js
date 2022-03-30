import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {  useDispatch } from 'react-redux';
import { submitBenchEmployeePost } from "../../actions/Employee";



export default function BenchEmployeeModal(props) {
    
    const [fields,setFields] = useState();
    const {showModal, modalTitle} = props;
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    
    const _validateForm = () => {
        let formFields = fields;
        let formIsValid = true;
            if(!formFields){
                formIsValid = false;
                setError("*Please upload  file")
            }
            else if (!formFields.match(/\.(xlsx)$/)) {
                formIsValid = false;
                setError("*Please upload xlsx file")
                
            }else{
                setError(" ")
            }
        
            return formIsValid;
      };
    const _handleChange = (event) => {
        const { value } = event.target;
        setFields(value);
    }
    const _handleModalCloseClick = () => {
        props.handleModalClose(false)
    }
    const _handleSubmit = (event) => {
        event.preventDefault();
        if (_validateForm()) {
            let postData = new FormData(event.target)
            dispatch(submitBenchEmployeePost(postData));
            props.handleModalClose(false);
            
        }
    }
    return (
        <>
            <Modal  show={showModal} onHide={_handleModalCloseClick} backdrop="static">
            <form className="form-inline user-form" onSubmit={(event) => _handleSubmit(event)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" 
                        name="bench_employee"
                        placeholder='Enter here'
                        //required={true}
                        className="form-control"
                        id="resume"
                        onChange={(event)=>_handleChange(event)}
                    />
                    
                    <div className="errorMsg">{error ? error  : ""}</div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={_handleModalCloseClick}>Cancel</button>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
        </>
    )
}
