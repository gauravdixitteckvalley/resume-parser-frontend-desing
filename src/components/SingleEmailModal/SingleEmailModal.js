import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  sendMail
} from "../../actions/Resume";

export default function SingleEmailModal(props) {
  const [fields, setFields] = useState();
  const dispatch = useDispatch();
  const _handleModalCloseClick = () => {
    props.handleModalClose(false);
  };
  const { singleMailModal, modalTitle } = props;

  const _handleSubmit = (event) => {
    event.preventDefault();
    const postData = {
      mail_text: fields,
      mail_id: props.sendMailData,
    };
    // console.log(postData);
    dispatch(sendMail(postData));
    // console.log(dispatch(sendMail(postData)), "------single dxbgdfgd");
    props.handleModalClose(false);
  };

  const _handleChange = (event) => {
    const { name, value } = event.target;
    setFields(value);
  };

  return (
    <Modal show={singleMailModal} onHide={_handleModalCloseClick} backdrop="static">
      <form
        className="form-inline user-form"
        onSubmit={(event) => _handleSubmit(event)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            name="single_Mail"
            id="singleMail"
            placeholder="Enter here"
            onChange={(event) => _handleChange(event)}
            required={true}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            onClick={_handleModalCloseClick}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
