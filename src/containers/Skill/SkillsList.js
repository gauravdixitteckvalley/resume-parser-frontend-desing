import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
import Pagination from "react-js-pagination"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import SearchBox from "../../components/Search/SearchBox"
import { fetchSkillsData, deleteSkill } from "../../actions/Skills"
import { displayRecordNotFound } from '../../utils/helper'
import Modal from '../../components/ConfirmationModal/Modal';
import "./Skill.css";

const SkillsList = (props) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
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
        dispatch(fetchSkillsData(params));
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

     /*method called to when record deleted option is chosen*/
     const _deleteskillData = (status) => {
        if(status) {
            dispatch(deleteSkill(selectedRowId));  // action is called to get data
            _handleModalCloseClick(false);  //modal is closed
        }
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
        dispatch(fetchSkillsData(queryParams));
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
                                <td>{data.value}</td>
                                <td className="icons-list">
                                    <div  style={tbodyDiv}>
                                        <NavLink to={`/skills/edit/${data.id}`} className="ms-2" title="Edit">
                                            <i className="mdi mdi-square-edit-outline"></i>
                                        </NavLink>
                                        
                                        <Link className="delete" title="Delete"  style={{'cursor':'pointer'}}
                                            onClick={(event) => _handleModalShowClick(event,index)} >
                                            <i className="mdi mdi-delete"></i>
                                        </Link> 
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


    const {totalRecords, per_page , blocking, skillsList, currentPage } = skills;
    let total = 0;
    
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
    
    return (
        <Fragment>
            <BlockUI blocking={blocking} />
            <div className="page-header">
                <h3 className="page-title"> Skills List</h3>
            </div>
            <div className="row ">
                <div className="col-lg-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div className="add-items row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2"><NavLink to={'/skills/create'}><button type="button" className="btn btn-gradient-primary btn-fw">Create Skill</button></NavLink> <NavLink to={'/skills/approval'}><button type="button" className="btn btn-gradient-primary btn-fw">Approve Skill</button></NavLink></div>
                                {/* <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 mb-2 float-left"><NavLink to={'/skills/approval'}><button type="button" className="btn btn-gradient-primary btn-fw">Approve Skill</button></NavLink></div> */}
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                                    <SearchBox searchParentclassName="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-2 offset-lg-7 offset-md-7"
                                        searchText="Search by Skills"
                                        searchInputChangeValue={(val) => _handleSearchInputChange(val)}
                                        searchValue={searchTitle}
                                    />
                                </div>
                            </div>
                            <p></p>
                            
                            {/* list of records */}
                            {_skillsList(skillsList)}
                            {/* <div className="position-absolute">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div> */}
                            {(total > per_page) ? 
                                <div className="pagination justify-content-between" aria-label="Page navigation example">
                                    <div>Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={Number(per_page)}
                                        totalItemsCount={total}
                                        pageRangeDisplayed={5}
                                        onChange={_handlePageChange}
                                        itemClass="page-item"
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        prevPageText=" Previous"
                                        innerClass="pagination justify-content-end"
                                        nextPageText="Next"
                                    /> 
                                </div> 
                            : <div>Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>}  
                    
                        </div>
                    </div>
                </div>
            </div>
             {/* delete pop up modal */}
             {showModal ? (<Modal 
                            showModal={showModal} 
                            handleModalClose={_handleModalCloseClick} 
                            updateData={_deleteskillData}
                            modalTitle="Delete Record"
                            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
            />) : null}

        </Fragment>
    )
}

export default SkillsList