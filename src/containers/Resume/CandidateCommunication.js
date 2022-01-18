import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import BlockUI from "../../components/BlockUI";
import CommentModal from "../../components/CommentModal/CommentModal";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import { addResumeComment,getResumeCommunication } from "../../actions/Resume";

import { displayRecordNotFound, API_URL, displayErrorMessage } from '../../utils/helper';

const CandidateCommunication = (props) => {

    const currentId = props?.match?.params?.id;
    const [showModal, setShowModal] = useState(false);
    const resumes = useSelector(state => state.resume);
    const dispatch = useDispatch();
    
    

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData();

    }, []);// eslint-disable-line react-hooks/exhaustive-deps


    /**method to call the configure the data and call the action */
    const _getData = (data, params = {}) => {
        
        dispatch(getResumeCommunication(currentId));
    }

    /*method called to display modal*/
    const _handleModalShowClick = () => {
        setShowModal(true)
    }

    /*method called to close modal*/
    const _handleModalCloseClick = (value) => {
        setShowModal(value)
    }
    
    /*method called to when record deleted option is chosen*/
    const _addResumeComment = (data) => {
        if(data) {
            const formData = {
                candidate_id : currentId,
                comment      : data.commentValue
            }
            dispatch(addResumeComment(currentId,formData));
            _handleModalCloseClick(false);  //modal is closed
        }
    }    

    const _buildCommunicationList = (resumes) =>{

        if (!_.isEmpty(resumes)) {
            return (
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr role="row">
                            <th>Candidate Name</th>
                            <th>Candidate Email</th>
                            <th>Status</th>
                            <th>Note</th>
                            <th>Updated By User</th>
                            <th>Updated On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumes.map((data, index) => (
                            <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{data.candidate.name}</td>
                                <td>{data.candidate.email}</td>
                                <td>{data.candidate_status_name[0]?.name}</td>
                                <td>{data.note}</td>
                                <td>{data.user.first_name +' '+data.user.last_name }</td>
                                <td>{ moment(data.created_at).format('DD-MM-YYYY HH:mm') }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            )
        } else if (_.isEmpty(resumes)) {
            return (
                displayRecordNotFound('No Resume Found')
            )
        }
    }

    const { blocking, resumeCommunication } = resumes;
    
 
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <h3> Candidate Communication </h3>

            <div className="row clearfix" >
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <a onClick={(event) => _handleModalShowClick()} className="btn btn-primary mb-2">Add Note</a>
                    
                        </div>
                    </div>    
                    <div className="table-responsive">
                            {/* list of records */}
                            {_buildCommunicationList(resumeCommunication)}

                            {/* {(total > per_page) ? 
                                <div className="pagination mb-3 pagination-content">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={Number(per_page)}
                                        totalItemsCount={total}
                                        pageRangeDisplayed={5}
                                        onChange={_handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        innerClass="pagination text-center"
                                    /> 
                                </div> 
                            : ''}  */}
                        </div>
                </div>
            </div>

             {/* add note pop up modal */}
             {showModal ? (<CommentModal 
                            showModal={showModal} 
                            handleModalClose={_handleModalCloseClick} 
                            addCommentData={_addResumeComment}
                            modalTitle="Add Note"
                            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
            />) : null}

        </Fragment>
    )
}

export default CandidateCommunication;