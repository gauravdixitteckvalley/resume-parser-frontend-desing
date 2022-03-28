import React, { useState } from 'react';
import _ from 'lodash';
import { NavLink, Link } from "react-router-dom"
import Select from "react-select";
import { Form } from "react-bootstrap";

import './BenchCandidateList.css'

export default function BenchCandidateList(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [empcode, setEmpcode] = useState('');
    const [tl, setTl] = useState('');
    const [skillsSearch, setSkillsSearch] = useState('');
    const [skillsData, setSkillsData] = useState([]);
    const [status, setStatus] = useState('');

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

    return (
        <>
        <div className='export-btn'>
            <NavLink to="#" className='btn btn-gradient-primary btn-fw'>Export Bench Candidate</NavLink>
        </div>
        
        <div className="row">
            <div className="col-lg-12 grid-margin stretch-card mb-4">
                <div className="card">
                <div className="card-body">
                    <h3 class="page-title font-style-bold mb-4">Search by Preference</h3>
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
                        </tr>
                    </thead>
                    <tbody>
                    
                    <tr>
                        <td className="actions icons-list my-mdi-cls">
                        Kuldeep
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        kuldeeprawat@virtualemployee.com
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        Software Engineer
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        React, Node
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        Kuldeep
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                        Kuldeep
                        </td>
                        {/* <td className="actions icons-list my-mdi-cls">
                            <div className="actions-cls">
                                <NavLink target="_blank" to='/jobs/job-details'>
                                <i className="mdi mdi mdi-eye" aria-hidden="true"></i>
                                </NavLink>
                                <NavLink target="_blank" to='#'>
                                <i className="mdi mdi-square-edit-outline" aria-hidden="true"></i>
                                </NavLink>
                                
                                <Link 
                                to="#"
                                title="Delete"
                                style={{'cursor':'pointer'}}
                                    >
                                <i className="mdi mdi-delete" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </td> */}
                    </tr>
                    </tbody>
                    </table>
                </div>
                
                </div>
            </div>
            </div>
        </div>
        </> 
    )
}