import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { NavLink, Link } from "react-router-dom"
import Select from "react-select";
import BenchEmployeeModal  from '../../components/BenchEmployeeModel' 
import { getBenchEmployee } from '../../actions/Employee'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from "react-js-pagination"

import './BenchCandidateList.css'
import BlockUI from "../../components/BlockUI";

export default function BenchCandidateList(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [empcode, setEmpcode] = useState('');
    const [tl, setTl] = useState('');
    const [skillsSearch, setSkillsSearch] = useState('');
    const [skillsData, setSkillsData] = useState([]);
    const [status, setStatus] = useState('');
    const [sortingOption, setsortingOption]   = useState({});

    const [showModal, setShowModal] = useState(false);
    const bench = useSelector(state => state.employee);
    const dispatch = useDispatch();

    useEffect(()=>{
        _getData();
    },[]);
    

    const _getData = (data, params = {}) => {
       
        const queryParams = {
          page    : data ? data : 1,    
          email   : params?.email,
          code   : params?.empcode,
          tl    : params?.tl,
          skillsSearch : params?.skillsSearch,
          skillsData  : params?.skillsData,
          sortingData : params.sortingData === undefined ? {} : params.sortingData,
          status  : status,
    
        }
        
        dispatch(getBenchEmployee(queryParams))
      }


    /*handle reset event*/
    const _handleReset = () => {
        setName('')
        setEmail('')
        setEmpcode('')
        setTl('')
        setSkillsData([])
        setSkillsSearch('')
        setStatus('')
        localStorage.removeItem('headerSearch');
      }

    const _handleModalShowClick = (event) => {
        event.preventDefault();
        setShowModal(true);
    }
    
    const _handleModalCloseClick = (value) =>{ 
        setShowModal(value);
    }

    const _handlePageChange = (pageNumber) => _getData(pageNumber, {name, email , skills : skillsSearch, sortingData: sortingOption,status });

    const { blocking, currentPage, per_page, totalRecords, benchList  } = bench;

    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;

    return (
        <>
         <BlockUI blocking={blocking} />
        <div className='export-btn'>
            <NavLink to="#" onClick={(event) => _handleModalShowClick(event)} className='btn btn-gradient-primary btn-fw'>Import Bench Candidate</NavLink>
        </div>
        
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card mb-4">
                <div className="card">
                <div className="card-body">
                    <h3 className="page-title font-style-bold mb-4">Search by Preference</h3>
                    <form className="form-inline">
                    <div className="row">
                        <div className="col-md-4">
                        <input
                            type="text"
                            name="name"
                            // value={name}
                            // onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Name"
                        />
                        </div>
                        <div className="col-md-4">
                        <input
                            type="email"
                            name="email"
                            // value={email}
                            // onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Email"
                        />
                        </div>
                        <div className="col-md-4">
                        <input
                            type="text"
                            name="empcode"
                            // value={phone}
                            // onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Emp. Code"
                        />
                        </div>
                    </div>
                    <div className="row mt-2 mb-2">
                        <div className="col-md-4">
                        <input
                            type="text"
                            name="tl"
                            // value={company}
                            // onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Team Leader"
                        />
                        </div>
                        <div className="col-md-4">
                        <Select
                            placeholder={"Select Skills"}
                            isMulti
                            // options={definedSkills}
                            // onChange={_handleSkillChange}
                            // value={skillsData}
                        />
                        </div>
                        <div className="col-md-4">
                        <input
                            type="text"
                            name="status"
                            // value={phone}
                            // onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Status"
                        />
                        </div>
                    </div>
                    <button
                        type="button"
                        // onClick={() => _handleSubmit()}
                        className="btn btn-gradient-primary mb-2"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => _handleReset()}
                        className="btn btn-light mb-2"
                        style={{ marginLeft: "10px" }}
                    >
                        Reset
                    </button>
                    </form>
                </div>
                </div>
            </div>

            <div className="col-12 grid-margin">
            <div className="card">
                <div className="card-body">
                <div className="">
                    <table className="table table-bordered mb-4 table-responsive">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Skills </th>
                            <th> TL </th>
                            <th> Emp Code </th>
                            <th> Status </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                    { benchList?.map((data, index)=>( 
                    <tr key={index}>
                        <td className="actions icons-list my-mdi-cls">
                            {data.employee_name}
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        { data.employee_email }
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        { data.employee_skill }
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        { data.employee_title }
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        { data.employee_code }
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        { data.status }
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                            <div className="actions-cls">
                                <NavLink target="_blank" to='#'>
                                <i className="mdi mdi mdi-eye" aria-hidden="true"></i>
                                </NavLink>
                                
                                <Link 
                                to="#"
                                title="Delete"
                                style={{'cursor':'pointer'}}
                                    >
                                <i className="mdi mdi-delete" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </td>
                    </tr>
                    ))  }
                    </tbody>
                    </table>
                </div>
                {total > per_page ? (
                    <div aria-label="Page navigation example" style={{display:'flex', justifyContent: 'space-between'}}>
                    <div className="">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={Number(per_page)}
                        totalItemsCount={total}
                        prevPageText="Prev"
                        nextPageText="Next"
                        pageRangeDisplayed={5}
                        onChange={_handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                        innerClass="pagination justify-content-end"
                    />
                    </div>
                ) : (
                    ""
                )}
                </div>
            </div>
            </div>
        </div>

        {showModal ? (
                  <BenchEmployeeModal
                    showModal={showModal}
                    handleModalClose={_handleModalCloseClick}
                    modalTitle="Upload Bench Employee"
                    modalBody="Are you sure you wish to perform this action? This action is irreversible!"
                  />
                ) : null}
        </> 
    )
}