import React, { Fragment, useState } from "react"
import { Form, Modal } from "react-bootstrap";

import BlockUI from "../../../components/BlockUI";
import './SelectResume.css';

const SelectResume = () => {

    const [designerShow, setDesignerShow] = useState(false);
    const [developerShow, setDeveloperShow] = useState(false);

    return (
        <Fragment>
            <BlockUI /> 
            <div className="page-header">
              <h3 className="page-title">Select Resume</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <form className="form-inline user-form">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="mb-3 required" for="inlineFormInputName2">Select Candidate</label>
                                        <Form.Control as="select" name="name" > 
                                            <option value=''>Select Name</option> 
                                            <option>Sandip Ghosh</option>
                                        </Form.Control>
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <label className="mb-1 required" for="inlineFormInputName2">Select Template</label><br />
                                        <div className="check-sec">
                                            <div className="form-check form-check-inline mt-2">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                                <label className="form-check-label" for="inlineRadio1">Designer</label>
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
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                                <label className="form-check-label" for="inlineRadio2">Developer</label>
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
                                    </div>
                                </div>
                                <hr className="mt-4"/>
                                <button type="submit" className="btn btn-gradient-primary mt-3 mb-2">Download</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         
        </Fragment>
    )

}    

export default SelectResume;