import React, { Fragment, useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom"
import Pagination from "react-js-pagination"
import _ from 'lodash'

import BlockUI from "../../components/BlockUI"
import SearchBox from "../../components/Search/SearchBox"
import { fetchSkillsData, deleteSkill } from "../../actions/Skills"
import { displayRecordNotFound } from '../../utils/helper'
import Modal from '../../components/ConfirmationModal/Modal'

const SkillsList = (props) => {
    const [searchTitle, setSearchTitle] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState('');

    /**fetched data from redux store */
    const skills = useSelector(state => state.skills);
    const dispatch = useDispatch();

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData();

    }, [searchTitle]);// eslint-disable-line react-hooks/exhaustive-deps

    
    /**method to call the configure the data and call the action */
    const _getData = (data) => {
        const params = {
            page    : data ? data : 1,
            search  : searchTitle
        }
        dispatch(fetchSkillsData(params));
    }

    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber)

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

    /* build user list */
    const _skillsList = skills => {
        if (!_.isEmpty(skills)) {
            return (
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr role="row">
                            {/* <th>S.No</th> */}
                            <th>Name</th>
                            {/* <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((data, index) => (
                            <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
                                {/* <td>{ data.serial_no }</td> */}
                                <td>{data.value}</td>
                                {/*<td>{data.last_name}</td>
                                <td>{data.email}</td>*/}
                                <td className="actions">
                                     <NavLink to={`/skills/edit/${data.id}`} className="ms-2" title="Edit">
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </NavLink>
                                    
                                    <a className="delete" title="Delete" className="ms-2" style={{'cursor':'pointer'}}
                                        onClick={(event) => _handleModalShowClick(event,index)} >
                                        <i className="fa fa-trash" aria-hidden="true"></i>
                                    </a> 
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
            <h3>Skills List</h3>

            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 mb-2">
                            <NavLink to={'/skills/create'} className="btn btn-primary">Create Skill</NavLink>
                        </div>
                    
                        <SearchBox searchParentClass="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-2 offset-lg-7 offset-md-7"
                                    searchText="Search by Skills"
                                    searchInputChangeValue={(val) => _handleSearchInputChange(val)}
                                    searchValue={searchTitle}
                        />
                    </div>
                    
                    <div className="table-responsive">
                        {/* list of records */}
                        {_skillsList(skillsList)}
                        <div class="position-absolute">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>
                        {(total > per_page) ? 
                            <div className="pagination mb-3" style={{"justifyContent" : "right"}}>
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
                        : ''} 
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