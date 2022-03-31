import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { NavLink, Link } from "react-router-dom"
import Select from "react-select";
import BenchEmployeeModal  from '../../components/BenchEmployeeModel' 
import { getBenchEmployee, UpdateEmployeeStatus } from '../../actions/Employee'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from "react-js-pagination"
import { displayErrorMessage } from '../../utils/helper';
import SelectBoxDropdown from "../../components/SelectBoxDropdown";

import './BenchCandidateList.css'
import BlockUI from "../../components/BlockUI";

export default function BenchCandidateList(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [empcode, setEmpcode] = useState('');
    const [tl, setTl] = useState('');
    const [skills, setSkills] = useState('');
    const [status, setStatus] = useState('');
    const [sortingOption, setsortingOption]   = useState({});
    const [selectedOption, setSelectedOption] = useState([]);
    
    const [showModal, setShowModal] = useState(false);
    const bench = useSelector(state => state.employee);
    const dispatch = useDispatch();

    useEffect(()=>{
        _getData();
    },[]);
    

    const _getData = (data, params = {}) => {
       
        const queryParams = {
          page    : data ? data : 1,    
          name   : params?.name,
          email   : params?.email,
          code   : params?.empcode,
          tl    : params?.tl,
          skills : params?.skills,
          skillsData  : params?.skillsData,
          sortingData : params.sortingData === undefined ? {} : params.sortingData,
          status  : params?.status,
    
        }
        
        dispatch(getBenchEmployee(queryParams))
      }


    /*handle reset event*/
    const _handleReset = () => {
        setName('')
        setEmail('')
        setEmpcode('')
        setTl('')
        setSkills('')
        setStatus('')
        
        _getData()

    }

    const _handleModalShowClick = (event) => {
        event.preventDefault();
        setShowModal(true);
    }
    
    const _handleModalCloseClick = (value) =>{ 
        setShowModal(value);
    }

    const _handleChange = (event) =>{
        const {name, value} = event.target
        if(name === 'name')
            setName(value);

        if(name === 'email')
            setEmail(value);
            
        if(name === 'empcode')
            setEmpcode(value); 
            
        if(name === 'tl')
            setTl(value); 
            
        if(name === 'skill')
            setSkills(value);
            
        if(name === 'status')
            setStatus(value);
                      
    }

    const _handleSubmit = () =>{

        if(_.isEmpty(name) && _.isEmpty(email) && _.isEmpty(empcode) && _.isEmpty(tl) && _.isEmpty(status) && _.isEmpty(skills) )
            displayErrorMessage('Please input any search field first')
        
        _getData('', {name, email, empcode, tl, skills, sortingData: sortingOption,status })
    }

    const _handlePageChange = (pageNumber) => _getData(pageNumber, {name, email , empcode, tl, skills, sortingData: sortingOption,status });

    const handleStatusChange=(event,employee_id)=>{
        
        dispatch(UpdateEmployeeStatus(employee_id,{status:event.target.value }))
        setSelectedOption(Object.assign({...selectedOption, [employee_id] : event.target.value }))
    }

    const { blocking, currentPage, per_page, totalRecords, benchList  } = bench;
    const bench_status = [ { value:'Bench', label:'Bench'}, {value:'Engaged' , label : "Engaged"}]
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;

    return (
      <>
        <BlockUI blocking={blocking} />
        <div class="page-header">
          <h3 class="page-title"> Inhouse Bench Candidate</h3>
          <div className="export-btn template-demo mb-2">
            <NavLink
                to="/bench-candidate-list/view-reports"
                className="btn btn-gradient-primary btn-fw"
            >
                View Reports
            </NavLink>
            <NavLink
                to="#"
                onClick={(event) => _handleModalShowClick(event)}
                className="btn btn-gradient-primary btn-fw"
            >
                Import Bench Candidate
            </NavLink>
            </div>
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
                            value={name}
                            onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Name"
                        />
                        </div>
                        <div className="col-md-4">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Email"
                        />
                        </div>
                        <div className="col-md-4">
                        <input
                            type="text"
                            name="empcode"
                            value={empcode}
                            onChange={(event) => _handleChange(event)}
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
                            value={tl}
                            onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Team Leader"
                        />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                name="skill"
                                value={skills}
                                onChange={(event) => _handleChange(event)}
                                className="form-control mb-2 mr-sm-2 col-md-6"
                                id="inlineFormInputName2"
                                placeholder="Skills"
                            />
                        </div>
                        <div className="col-md-4">
                        {/* <input
                            type="text"
                            name="status"
                            value={status}
                            onChange={(event) => _handleChange(event)}
                            className="form-control mb-2 mr-sm-2 col-md-6"
                            id="inlineFormInputName2"
                            placeholder="Status"
                        /> */}

                        <select 
                        className='form-select my-form-select'
                        name="status"
                        value={status}
                        onChange={(event) => _handleChange(event)}>
                            <option value="Bench"> Bench</option>
                            <option value="Engaged"> Engaged</option>
                        </select>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => _handleSubmit()}
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
          </div>

          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <div className="">
                  <table className="table table-bordered mb-4 table-responsive">
                    <thead>
                      <tr>
                        <th>
                          Name
                          <button className="icon-up">
                            <i className="mdi mdi-chevron-up"></i>
                          </button>
                          <button className="icon-down">
                            <i className="mdi mdi-chevron-down"></i>
                          </button>
                        </th>
                        <th>
                          Email
                          <button className="icon-up">
                            <i className="mdi mdi-chevron-up"></i>
                          </button>
                          <button className="icon-down">
                            <i className="mdi mdi-chevron-down"></i>
                          </button>
                        </th>
                        <th>
                          Skills
                          <button className="icon-up">
                            <i className="mdi mdi-chevron-up"></i>
                          </button>
                          <button className="icon-down">
                            <i className="mdi mdi-chevron-down"></i>
                          </button>
                        </th>
                        <th>
                          TL
                          <button className="icon-up">
                            <i className="mdi mdi-chevron-up"></i>
                          </button>
                          <button className="icon-down">
                            <i className="mdi mdi-chevron-down"></i>
                          </button>
                        </th>
                        <th> Emp Code </th>
                        <th> Status </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchList?.map((data, index) => (
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
                        {/* { data.status } */}
                        <SelectBoxDropdown
                          dataOptions={bench_status}
                          name={`${data._id}`}
                        //   value={data.status}
                          value={
                            _.isEmpty(selectedOption[`${data._id}`])
                              ? data.status
                              : selectedOption[`${data._id}`]
                          }
                          handleStatusChange={(event) =>
                            handleStatusChange(event, `${data._id}`)
                          }
                        />
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                            <div className="actions-cls">
                                <NavLink 
                                to={{ pathname: `bench-candidate-list/bench-candidate-preview`,
                                      benchProps: data }}>
                                <i className="mdi mdi mdi-eye" aria-hidden="true"></i>
                                </NavLink>
                                
                                {/* <Link 
                                to="#"
                                title="Delete"
                                style={{'cursor':'pointer'}}
                                    >
                                <i className="mdi mdi-delete" aria-hidden="true"></i>
                                </Link> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {total > per_page ? (
                  <div
                    aria-label="Page navigation example"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="">
                      Showing{" "}
                      {currentPage * Number(per_page) - Number(per_page)} to{" "}
                      {currentPage * Number(per_page) > total
                        ? total
                        : currentPage * Number(per_page)}{" "}
                      of {total} entries
                    </div>
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
        

        {showModal ? (
          <BenchEmployeeModal
            showModal={showModal}
            handleModalClose={_handleModalCloseClick}
            modalTitle="Upload Bench Employee"
            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
          />
        ) : null}
      </>
    );
}