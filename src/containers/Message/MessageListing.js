import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import Pagination from "react-js-pagination"

import BlockUI from "../../components/BlockUI"
import './MessageListing.css';
import { fetchMessageData } from '../../actions/Message';
import _ from 'lodash';
import { displayRecordNotFound, API_URL, displayErrorMessage,IMAGE_URL } from '../../utils/helper';
import moment from 'moment'

const MessageListing = () => {

    const [searchTitle, setSearchTitle] = useState('');
    const [sortingOption, setSortingOption] = useState({})
    /**fetched data from redux store */
    // console.log(state.message);
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
        
    const _buildList = (data) =>{

        if (!_.isEmpty(data)) {
        return (
            <> 
            { data.map((data, index) => ( 
                
                <div className="listings" key={index} style={{ backgroundColor : (!data.is_view)?'rgb(219 221 223)':'' }}  >
                    <Link to={`/message-details/${data._id}`}  className="bold-font">
                        <div className="row">
                            <div className="col-md-4"><p><img src={data.users.profile_image ? IMAGE_URL+data.users.profile_image :"/assets/img/user_icon.png"} className="me-2" alt="image" /> { data.users.first_name +' '+ data.users.last_name }</p></div>
                            <div className="col-md-4"><p>{ data.message_subject }</p></div>
                            <div className="col-md-4 text-right-cls"><p>{ moment(data.createdAt).calendar() }</p></div>
                        </div>
                    </Link>
                </div> 
            )) }  
            </>  
        )
        } else {
            return (
              displayRecordNotFound('No Resume Found')
            )
          }
    }
    // const { blocking, messageList } = messages;
    const { totalRecords, per_page , blocking, messageList,currentPage } = messages;
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
        console.log(messageList);
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
                        <div className="add-items row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                                <Link to="/message/sent-item">
                                    <button type="button" className="btn btn-gradient-primary btn-fw mb-2"> Sent Item </button>
                                </Link>
                                <Link to="/message/compose" >
                                    <button type="button" className="btn btn-gradient-primary btn-fw mb-2" > Compose </button>
                                </Link>
                            </div>
                        </div>    
                        {/* <div className="add-items row">
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-end text-right">
               
                <Link to="/sent-item">
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Sent Item
                    </button>
                  </Link>
                  <Link to="/messages" >
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Compose
                    </button>
                  </Link>
                </div>
                </div> */}
                            <div>
                                <div className="message-listing mb-3">

                                    { _buildList(messageList) }
                                    
                                    {/* <div className="listings">
                                        <Link to="#" className="bold-font">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div>  
                                    <div className="listings">
                                        <Link to="/message-details">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> 
                                    <div className="listings">
                                        <Link to="/message-details">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> 
                                    <div className="listings">
                                        <Link to="/message-details">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> 
                                    <div className="listings">
                                        <Link to="/message-details">
                                            <p><img src="./assets/img/user_icon.png" className="me-2" alt="image" /> Sandip Ghosh</p>
                                            <p>New Application for frontend developer</p>
                                            <p>12:22 PM</p>
                                        </Link>
                                    </div> */}
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
         
        </Fragment>
    )
}

export default MessageListing;