import React,{useState} from 'react';
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from 'react-redux'
import { updateResume } from "../../actions/Resume";
import { displayRecordNotFound, API_URL, displayErrorMessage } from '../../utils/helper';
import axios from 'axios';

export default function UploadResume(props) {
    const [fields,setFields] = useState();
    const [fileName,setFileName] =useState("")
    let id = props.id;
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
            else if (!formFields.match(/\.(pdf|docx|doc|gif)$/)) {
                formIsValid = false;
                setError("*Please upload .pdf/.docx/.doc file")
                
            }else{
                setError(" ")
            }
        
            return formIsValid;
        
        
      };
    const _handleChange = (event) => {
        const { name, value } = event.target;
        //console.log("event.target ",event.target.files[0])
        setFileName(event.target.files[0])
        setFields(value);
    }
    const _handleModalCloseClick = () => {
        props.handleModalClose(false)
    }
    const _handleSubmit = (event) => {
        event.preventDefault();
        if (_validateForm()) {
            let postData = new FormData(event.target)
        
            if(id){
                dispatch(updateResume(id,postData));
                props.handleModalClose(false);
            }
        }
        //return false;
    }
  return (
    <>
        {/* <Modal show={showModal}  backdrop="static"> */}
        <Modal  show={showModal} onHide={_handleModalCloseClick} backdrop="static">
            <form className="form-inline user-form" onSubmit={(event) => _handleSubmit(event)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" 
                        name="resume"
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
