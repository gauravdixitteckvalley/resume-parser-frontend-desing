import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom"
import Pagination from "react-js-pagination"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import SearchBox from "../../components/Search/SearchBox"
import { fetchSkillsTempData, approveTempSkill } from "../../actions/Skills"
import { displayRecordNotFound } from '../../utils/helper'
import Modal from '../../components/ConfirmationModal/Modal';
import InputBox from '../../components/InputBox';

import "./SkillsApproval.css";

const SkillsApproval = (props) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [editRow, setEditRow] = useState('');
    const [editRowValue, setEditRowValue] = useState('');
    const [selectedRowId, setSelectedRowId] = useState('');
    const [sortingOption, setsortingOption]               = useState({});

    /**fetched data from redux store */
    const skills = useSelector(state => state.skills);
    const dispatch = useDispatch();

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData();

    }, [searchTitle]);// eslint-disable-line react-hooks/exhaustive-deps

    
    /**method to call the configure the data and call the action */
    const _getData = (data, sortingData) => {
        const params = {
            page    : data ? data : 1,
            search  : searchTitle,
            sortingData : sortingData === undefined ? {} : sortingData
        }
        dispatch(fetchSkillsTempData(params));
    }

    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber, sortingOption)

    /*method called to when search is performed*/
    const _handleSearchInputChange = (value) => setSearchTitle(value)

    /*method called to display modal*/
    function _handleModalShowClick(e,i){
        e.preventDefault();
        setShowModal(true)
        setSelectedRowId(skills.skillsList[i].id)
    }

    /*method called to close modal*/
    const _handleModalCloseClick = (value) => {
        setShowModal(value)
    }


    const tbodyDiv = {
        borderBottom: "0",
        borderRight: "0",
        padding: "0 ",
      };

    // method to add sorting functionality on columns
    const onClickEventForSorting = (fieldName, order) => {
        const setStateValue = { name: fieldName, order }
        setsortingOption(setStateValue)
        const queryParams = {
            page    : 1,
            search  : searchTitle,
            sortingData : setStateValue
        }
        dispatch(fetchSkillsTempData(queryParams));
    }

    const _handleApproved = (id,value,status,currentPage)=>{
        
        const postdata = {
            skills_status   : status,
            value           : (editRowValue ==='')? value: editRowValue
        };
        const params = {
            page    : currentPage ? currentPage : 1,
            search  : '',
            sortingData : {}
        }
        dispatch(approveTempSkill(id,postdata,params));
        setEditRow('')
        setEditRowValue('')
    }

    const _handleEdit = (rowIndex,value) =>{
        
        setEditRow(rowIndex)
        setEditRowValue(value)
        setShowInput(true);
    }

    const _handleClick = (event)=>{
        setEditRowValue(event.target.value)
        // console.log('value',event.target.value);
    }
    /* build user list */
    const _skillsList = skills => {
        if (!_.isEmpty(skills)) {
            return (
              
                <table className="table table-bordered mb-4">
                    <thead>
                        <tr>
                            <th> # </th>
                            <th>
                                Skill Name
                                <button onClick={ () => onClickEventForSorting('value','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                                <button onClick={ () => onClickEventForSorting('value','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                            </th>
                            <th> Actions </th>
                        </tr>
                    </thead>
                    <tbody>

                        {skills.map((data, index) => (
                            <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{ data.serial_no }</td>
                                <td>{ (showInput && editRow === index) ? 
                                    <InputBox 
                                    InputValue={editRowValue}  
                                    handleClick={_handleClick}
                                    /> 
                                    : data.value }</td>
                                
                                <td>
                                    <div className="template-demo approval-sec">
                                        <button type="button" onClick={(event) => _handleApproved(data.id,data.value,true,currentPage)}  className="btn btn-primary btn-sm btn-inverse-success approval-btn">Approve</button>
                                        <button type="button" onClick={(event) => _handleApproved(data.id,data.value,false,currentPage)} className="btn btn-primary btn-sm btn-inverse-danger approval-btn" style={{ marginLeft: "10px" }}>Delete</button>
                                        <button type="button" onClick={(event) => _handleEdit(index,data.value)} className="btn btn-primary btn-sm btn-inverse-info approval-btn" style={{ marginLeft: "10px" }}>Edit</button>
                                    </div>
                                  
                                </td>
                            </tr>
                        ))}      
                    </tbody>
                </table>    
                          
            )
        } else if (_.isEmpty(skills)) {
            return (
                displayRecordNotFound('No User Records Found')
            )
        }
    }


    const {totalRecords, per_page , blocking, skillsTempList, currentPage } = skills;
 
    let total = 0;
    
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
    
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="page-header">
                <h3 className="page-title"> Skills Approval</h3>
            </div>
            <div className="row ">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="add-items row">
                                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2">
                                    <SearchBox searchParentclassName="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-2 offset-lg-7 offset-md-7"
                                        searchText="Search by Skills"
                                        searchInputChangeValue={(val) => _handleSearchInputChange(val)}
                                        searchValue={searchTitle}
                                    />
                                </div>
                            </div>
                            <p></p>
                            
                            {/* list of records */}
                            {_skillsList(skillsTempList)}
                            {/* <div className="position-absolute">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div> */}
                            {(total > per_page) ? 
                                <div className="pagination justify-content-end" aria-label="Page navigation example">
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={Number(per_page)}
                                        totalItemsCount={total}
                                        pageRangeDisplayed={5}
                                        onChange={_handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        prevPageText=" Previous"
                                        innerClass="pagination justify-content-end"
                                        nextPageText="Next"
                                    /> 
                                </div> 
                            : ''} 
                    
                        </div>
                    </div>
                </div>
            </div>
             {/* delete pop up modal */}
             {showModal ? (<Modal 
                            showModal={showModal} 
                            handleModalClose={_handleModalCloseClick} 
                            // updateData={_deleteskillData}
                            modalTitle="Delete Record"
                            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
            />) : null}

        </Fragment>
    )
}

export default SkillsApproval