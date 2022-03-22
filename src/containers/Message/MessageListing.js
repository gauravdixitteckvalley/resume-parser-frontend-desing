import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import Pagination from "react-js-pagination"

import BlockUI from "../../components/BlockUI"
import './MessageListing.css';
import { fetchMessageData, deleteMessageData } from '../../actions/Message';
import _, { indexOf } from 'lodash';
import { displayRecordNotFound, IMAGE_URL } from '../../utils/helper';
import moment from 'moment'
import Checkbox from "../../components/Checkbox";
import Modal from '../../components/ConfirmationModal/Modal';
import style from "../Resume/style"

const MessageListing = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [sortingOption, setSortingOption] = useState({})
    const [showDelModal, setShowDelModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState([]);
    /**fetched data from redux store */
    const messages = useSelector(state =>  state.message);

    const dispatch = useDispatch();
    
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData();

    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const _getData = (data) =>{
        const params = {
            page    : data ? data : 1,
            search  : searchTitle,
            sortingData : sortingOption
        }
        dispatch(fetchMessageData(params));
    }

    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber)

    const handleSelectOnly = (event) => {
        setIsChecked(!isChecked);
        if(deleteMessage.includes(event)) {
            const index = deleteMessage.indexOf(event)
            deleteMessage.splice(index, 1);
        } else {
            deleteMessage.push(event)
        }
    }

    
    /*method called to display modal*/
    function _handleDelModalShowClick(e,i){
        e.preventDefault();
        setShowDelModal(true);
        setDeleteMessage(i);
    }


    /*method called to when record deleted option is chosen*/
    const _deleteMessageData = (event, status) => {
        event.preventDefault()
        setIsChecked(false)
        setDeleteMessage([])
        if(status) {  
        dispatch(deleteMessageData(deleteMessage));  // action is called to get data
        _handleDelModalCloseClick(false);  //modal is closed
        console.log(isChecked, deleteMessage, 'check')
        }
    }

    const _handleDelModalCloseClick = (value) => {
        setShowDelModal(value);
      }
        
    const _buildList = (data) =>{

        if (!_.isEmpty(data)) {
        return (
            <> 
            { data.map((data, index) => ( 
                <Fragment key={index}>
                <div className="listings mb-3" key={index}>
                    <Checkbox
                        key={data.id}
                        className="form-check-input message-check" 
                        type="checkbox"
                        name={data.id}
                        id={data.id}
                        handleClick={() => handleSelectOnly(data._id)}
                        checked={isChecked}
                      />
                    <Link to={`message/message-details/${data._id}`}  style={{ fontWeight : (!data.is_view)?'700':'' }}  >
                        <div className="row align-items-center">
                            <div className="col-md-4"><p><img src={data.users.profile_image ? IMAGE_URL+data.users.profile_image :"/assets/img/user_icon.png"} className="me-2" alt="image" /> { data.users.first_name +' '+ data.users.last_name }</p></div>
                            <div className="col-md-4"><p>{ data.message_subject }</p></div>
                            <div className="col-md-4 text-right-cls"><p>{ (moment().isSame(data.createdAt, 'day'))? moment(data.createdAt).calendar() : moment(data.createdAt).format('MMM DD YYYY')  }</p></div>
                        </div>
                    </Link>
                </div> 
                <hr className="mb-4" />
                </Fragment>
            )) }  
            </>  
        )
        } else {
            return (
              displayRecordNotFound('No Resume Found')
            )
          }
    }

    
    const { totalRecords, per_page , blocking, messageList,currentPage } = messages;
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
        
    return (
        <Fragment>
            
            <BlockUI blocking={blocking} />
            <div className="page-header">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  <h3 className="page-title"> Message Inbox</h3>
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                        <div className="add-items row mb-0">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <Link to="/message/sent-item">
                                    <button type="button" className="btn btn-gradient-primary btn-fw mb-2"> Sent Item </button>
                                </Link>
                                <Link to="/message/compose" >
                                    <button type="button" className="btn btn-gradient-primary btn-fw mb-2" > Compose </button>
                                </Link>
                                <Link to="#" style={{display: deleteMessage.length>0 ? 'initial' : 'none' }}>
                                    <button type="button" className="btn btn-gradient-primary btn-fw mb-2" onClick={(event) => _handleDelModalShowClick(event, deleteMessage)}> Delete </button>
                                </Link>
                                
                            </div>
                        </div>    
                        
                            <div>
                                <div className="message-listing mb-3">                  
                                    <hr className="mb-4" />
                                    { _buildList(messageList) }
                                    
                                </div>
                                {(total > per_page) ? 
                            <div className="pagination mb-3" style={{"justifyContent" : "space-between"}}>
                                <div className="">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>
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
                        : <div className="">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>}

                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             {/* delete pop up modal */}
            {showDelModal ? (
            <Modal 
                showModal={showDelModal} 
                handleModalClose={_handleDelModalCloseClick} 
                updateData={_deleteMessageData}
                modalTitle="Delete Record"
                modalBody="Are you sure you wish to perform this action? This action is irreversible!"
            />
            ) : null}
        </Fragment>
    )
}

export default MessageListing;