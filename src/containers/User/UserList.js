import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
import Pagination from "react-js-pagination"
import _ from 'lodash'

import UserStyle from './style';
import BlockUI from "../../components/BlockUI"
import SearchBox from "../../components/Search/SearchBox"
import { fetchUserData, resetUserData, deleteUser } from "../../actions/User"
import { displayRecordNotFound } from '../../utils/helper'
import Modal from '../../components/ConfirmationModal/Modal'
import './Userlist.css';

const UserList = (props) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState('');
    const [sortingOption, setSortingOption] = useState({})

    /**fetched data from redux store */
    const users = useSelector(state => state.user);
    const dispatch = useDispatch();

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData();

        // returned function will be called on component unmount 
        return () => {
            dispatch(resetUserData())
        }
    }, [searchTitle]);// eslint-disable-line react-hooks/exhaustive-deps

    
    /**method to call the configure the data and call the action */
    const _getData = (data) => {
        const params = {
            page    : data ? data : 1,
            search  : searchTitle,
            sortingData : sortingOption
        }
        dispatch(fetchUserData(params));
    }

    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber)

    /*method called to when search is performed*/
    const _handleSearchInputChange = (value) => setSearchTitle(value)

    // method to add sorting on columns
    const onClickEventForSorting = (fieldName, order) => {
        const setStateValue = { name: fieldName, order }
        setSortingOption(setStateValue)
        const queryParams = {
            page    : 1,
            search  : searchTitle,
            sortingData : setStateValue
        }
        dispatch(fetchUserData(queryParams));
    }

    /* build user list */
    const _userList = users => {
        if (!_.isEmpty(users)) {
            return (
                <table className="table table-bordered mb-4">
                    <thead>
                        <tr>
                            {/* <th>
                                Username
                                <button onClick={ () => onClickEventForSorting('username','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                <button onClick={ () => onClickEventForSorting('username','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                            </th> */}
                            <th>
                                First Name
                                <button onClick={ () => onClickEventForSorting('first_name','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                <button onClick={ () => onClickEventForSorting('first_name','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                            </th>
                            <th>
                                Last Name
                                <button onClick={ () => onClickEventForSorting('last_name','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                <button onClick={ () => onClickEventForSorting('last_name','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                            </th>
                            <th>
                                Email
                                <button onClick={ () => onClickEventForSorting('email','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                <button onClick={ () => onClickEventForSorting('email','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                            </th>
                            <th>
                                Role
                                <button onClick={ () => onClickEventForSorting('user_role','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                <button onClick={ () => onClickEventForSorting('user_role','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                            </th>
                            <th>
                                Resume 
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((data, index) => (
                            <tr key={index} role="row">
                                {/* <td>{data.username}</td> */}
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.email}</td>
                                <td>{data.user_role}</td>
                                <td>{data.resumeCount}</td>
                                <td className="icons-list actions">
                                    <div className="actions-cls">
                                    { (userRole === "1")?    
                                    <NavLink to={`/user/edit/${data.id}`} className="ms-2" title="Edit">
                                        <i className="mdi mdi-square-edit-outline" aria-hidden="true"></i>
                                    </NavLink>
                                    :"" }
                                    {/* eslint-disable-next-line */}
                                    { (userRole === "1")? 
                                    <Link className="delete" title="Delete" className="ms-2" style={{'cursor':'pointer'}}
                                        onClick={(event) => _handleModalShowClick(event,index)}>
                                        <i className="mdi mdi-delete" aria-hidden="true"></i>
                                    </Link>
                                     :"" }
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>               
            )
        } else if (_.isEmpty(users)) {
            return (
                displayRecordNotFound('No User Records Found')
            )
        }
    }

    /*method called to display modal*/
    function _handleModalShowClick(e,i){
        e.preventDefault();
        setShowModal(true)
        setSelectedRowId(users.userList[i].id)
    }

    /*method called to close modal*/
    const _handleModalCloseClick = (value) => {
        setShowModal(value)
    }

    /*method called to when record deleted option is chosen*/
    const _deleteUserData = (status) => {
        if(status) {
            dispatch(deleteUser(selectedRowId));  // action is called to get data
            _handleModalCloseClick(false);  //modal is closed
        }
    }

    const {totalRecords, per_page , blocking, userList, currentPage, userRole } = users;
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
    
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <UserStyle>
            <div className="page-header">
              <h3 className="page-title"> Users List</h3>
            </div>
            <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                    <div className="add-items row">
                        {(userRole === "1")?
                        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 mb-2">
                            <NavLink to={'/user/create'} className="btn btn-gradient-primary btn-fw">Create User</NavLink>
                        </div>
                        : ''}
                   
                        <SearchBox searchParentClass="col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2"
                                    searchText="Search by username/email"
                                    searchInputChangeValue={(val) => _handleSearchInputChange(val)}
                                    searchValue={searchTitle}
                        />
                    </div>
                    
                    <div className="table-responsive">
                        {/* list of records */}
                        {_userList(userList)}

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
            {showModal ? (<Modal 
                            showModal={showModal} 
                            handleModalClose={_handleModalCloseClick} 
                            updateData={_deleteUserData}
                            modalTitle="Delete Record"
                            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
            />) : null}
            </UserStyle>
        </Fragment>
    )
}

export default UserList