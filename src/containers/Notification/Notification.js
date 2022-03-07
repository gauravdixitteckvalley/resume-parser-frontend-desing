import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import Pagination from "react-js-pagination"

import BlockUI from "../../components/BlockUI";
import './Notification.css';
import { fetchNoticeData } from '../../actions/Notice';
import _ from 'lodash';
import { displayRecordNotFound } from '../../utils/helper';
import moment from 'moment'

const Notification = () => {

    const [searchTitle, setSearchTitle] = useState('');
    const [sortingOption, setSortingOption] = useState({})

    /**fetched data from redux store */
    const notices = useSelector(state =>  state.notice);
    
    const authenticateUser = useSelector(state => state.authenticatedUser);
    const { user } = authenticateUser;

    const dispatch = useDispatch();

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData();

    }, []);

    const _getData = (data) =>{
        const params = {
            page    : data ? data : 1,
            search  : searchTitle,
            sortingData : sortingOption
        }
        dispatch(fetchNoticeData(params));
    }


    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber)

    const _buildList = (data) =>{

        if (user.user_role_name === 'Admin' ){
            if (!_.isEmpty(data)) {
                
                return (
                    <> 
                    { data.map((data, index) => ( 
                            <div className="row notification-container mb-4 pb-2" key={index}>
                                <div className="col-md-12 notification-main">
                                    <img src="/assets/img/user_icon.png" />
                                    <div className="content-area">
                                        <p>{ data.notice_text }</p>
                                        <p>{ moment(data.createdAt).calendar() }</p>
                                    </div>
                                </div>
                            </div>
                    )) }  
                    </>  
                )
            } else {
                return (
                    displayRecordNotFound('No Data Found')
                  )
            }
            
        } else {
        if (!_.isEmpty(data)) {
        return (
            <> 
            { data.map((data, index) => ( 
                    <div className="row notification-container mb-4 pb-2" key={index}>
                        <div className="col-md-12 notification-main">
                            <img src="/assets/img/user_icon.png" />
                            <div className="content-area">
                                <p>{ data.notice_text }</p>
                                <p>{ moment(data.createdAt).calendar() }</p>
                            </div>
                        </div>
                    </div>
            )) }  
            </>  
        )
        } else {
            return (
              displayRecordNotFound('No Data Found')
            )
          }
        }
    }

    const { totalRecords, per_page , blocking, noticeList, currentPage } = notices;
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="page-title font-style-bold mb-4">Your Notifications</h4>
                            <hr className="mb-4" />
                            { _buildList(noticeList) }
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
                            : <div className="">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Notification