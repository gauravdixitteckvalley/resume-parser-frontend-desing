import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom"
import Pagination from "react-js-pagination"
import _ from 'lodash'
import Select from "react-select";
import { Form } from "react-bootstrap";
import ResumeStyle from './style';
import BlockUI from "../../components/BlockUI";
import SelectBoxDropdown from "../../components/SelectBoxDropdown";
import { fetchResumeData, resetResumeData,updateStatusField } from "../../actions/Resume";
import { displayRecordNotFound, API_URL, displayErrorMessage } from '../../utils/helper';
import EmailModal from "../../components/EmailModal/EmailModal"
import axios from 'axios';

import './ResumeList.css';

const ResumeList = (props) => {
    const [name, setName]                   = useState('');
    const [email, setEmail]                 = useState('');
    const [phone, setPhone]                 = useState('');
    const [city, setCity]                   = useState('');
    const [company, setCompany]             = useState('');
    const [skillsSearch, setSkillsSearch]   = useState('');
    const [skillsData, setSkillsData]       = useState([]);
    const [minExp, setMinExp]               = useState('');
    const [maxExp, setMaxExp]               = useState('');
    const [status, setStatus]               = useState('');
    const [sending, setSending]               = useState(null);
    const [selectedOption, setSelectedOption] = useState([]);
    const [sortingOption, setsortingOption]   = useState({});
    const [min, setMinData]       = useState([1,2,3,4,5,6,7,8,9]);
    const [max, setMaxData]       = useState([2,3,4,5,6,7,8,9,10]);


    const [isCheck, setIsCheck] = useState(false);
    const [showModal, setShowModal] = useState(false);
    // const [isCheck, setIsCheck] = useState([]);

    /**fetched data from redux store */
    const resumes = useSelector(state => state.resume);
    const dispatch = useDispatch();
    // const min = [1,2,3,4,5,6,7,8,9];
    // const max = [2,3,4,5,6,7,8,9,10];
   
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        _getData();

        // returned function will be called on component unmount 
        return () => {
            dispatch(resetResumeData())
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    
    /**method to call the configure the data and call the action */
    const _getData = (data, params = {}) => {
        const queryParams = {
            page    : data ? data : 1,
            name    : params?.name,
            email   : params?.email,
            phone   : params?.phone,
            city    : params?.city,
            company : params?.company,
            skills  : params?.skills,
            sortingData : params.sortingData === undefined ? {} : params.sortingData,
            status  : status,
            minExp  : minExp,
            maxExp  : maxExp
        }
        dispatch(fetchResumeData(queryParams));
    }

    const handleStatusChange=(event,resume_id)=>{
        dispatch(updateStatusField({id:resume_id,candidate_status:event.target.value}))
        setSelectedOption(Object.assign({...selectedOption, [resume_id] : event.target.value }))
    }

    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber, {name, email, phone, city, company, skills : skillsSearch, sortingData: sortingOption,status, minExp, maxExp});

    const sendMail = async (mail, key) => {
        setSending(key);
        
        var postData = {
            'email': mail
        }
        
        const response = await axios.post(`${API_URL}mail/send`, postData);
        // console.log('Email sent: ', response);
        if (response.data.flag) {
            setSending(null);
            
            alert("Mail sent");
        }else{
            setSending(null);
            alert("Mail sent error, check the email");
        }
    }

    // method to add sorting functionality on columns
    const onClickEventForSorting = (fieldName, order, params = {}) => {
      const setStateValue = { name: fieldName, order }
      setsortingOption(setStateValue)
      const queryParams = {
          page    : 1,
          name    : name ,
          email   : email,
          phone   : phone,
          city    : city,
          company : company,
          skills  : skillsSearch,
          sortingData : setStateValue,
          status      : status,
          minExp      : minExp,
          maxExp      : maxExp
      }
      dispatch(fetchResumeData(queryParams));
  }

  /*method called to display modal*/
  const _handleModalShowClick = () => {
    setShowModal(true)
  }

  const _handleModalCloseClick = (value) => {
    setShowModal(value)
  }

  const handleSelectAll = () => {
    setIsCheck(!isCheck);
  }
  // console.log(isCheck);

    const _buildResumeListNew = (resumes,applicant_status) => {
        if (!_.isEmpty(resumes)) {
            return (
              <>
                <table className="table table-bordered mb-0 resume-list-table">
                  <thead>
                    <tr>
                      <th><input className="form-check-input" name="selectAll" type="checkbox" onChange={handleSelectAll} checked={isCheck} value="" id="selectAll flexCheckDefault" /> &nbsp; #</th>
                      <th>
                          Name
                          <button onClick={ () => onClickEventForSorting('name','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                          <button onClick={ () => onClickEventForSorting('name','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                      </th>
                      <th>
                          Email
                          <button onClick={ () => onClickEventForSorting('email','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                          <button onClick={ () => onClickEventForSorting('email','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                      </th>
                      <th>
                          Phone
                          <button onClick={ () => onClickEventForSorting('phone','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                          <button onClick={ () => onClickEventForSorting('phone','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                      </th>
                      <th>Upload Date</th>
                      <th>
                          Status
                          <button onClick={ () => onClickEventForSorting('candidate_status','asc') } className="icon-up"><i className="mdi mdi-chevron-up"></i></button>
                          <button onClick={ () => onClickEventForSorting('candidate_status','desc') } className="icon-down"><i className="mdi mdi-chevron-down"></i></button>
                      </th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {resumes.map((data, index) => ( 
                    
                      <tr
                        key={index}
                        role="row"
                        className={index % 2 === 0 ? "even" : "odd"}
                      >
                        <td><input className="form-check-input" name="selectAll" onChange={handleSelectAll} checked={isCheck ? "checked" : "unchecked"} type="checkbox" value="" id="flexCheckDefault" /> &nbsp; {index + 1} </td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>{ data.created_at}</td>
                        <td>
                          <SelectBoxDropdown
                            dataOptions={applicant_status}
                            name={`${data.id}`}
                            value={
                              _.isEmpty(selectedOption[`${data.id}`])
                                ? data.candidate_status
                                : selectedOption[`${data.id}`]
                            }
                            handleStatusChange={(event) =>
                              handleStatusChange(event, `${data.id}`)
                            }
                          />
                        </td>
                        <td className="actions icons-list my-mdi-cls">
                          {/* {data.resumePath ? ( */}
                          <div className="actions-cls">
                            {/* href={`${API_URL}resume/view/${data.resumePath}`} */}
                            <NavLink
                              target="_blank"
                              to={`/candidate/preview/${data.id}`}
                            >
                              <i className="mdi mdi mdi-eye" aria-hidden="true"></i>
                            </NavLink>
                            <NavLink
                              title="Candidate Communication"
                              to={`/candidate/communication/${data.id}`}
                            >
                              <i
                                className="mdi mdi mdi-message"
                                aria-hidden="true"
                              ></i>
                            </NavLink>
                            <NavLink
                              to={`/candidate/details/${data.id}`}
                            >
                              <i className="mdi mdi-square-edit-outline" aria-hidden="true"></i>
                            </NavLink>
                            <a
                              className={
                                "" +
                                (index === sending ? "disable" : "")
                              }
                              id={`mail_btn_${index}`}
                              onClick={() => sendMail(data.email, index)}
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className="mdi mdi mdi-email"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </div>
                          {/* ) : 'N/A'} */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </>
            );
        } else if (_.isEmpty(resumes)) {
            return (
                displayRecordNotFound('No Resume Found')
            )
        }
    }


    /* build resume list */
    // const _buildResumeList = (resumes,applicant_status) => {
    //     if (!_.isEmpty(resumes)) {
    //         return (
    //             <table className="table table-bordered table-striped table-hover">
    //                 <thead>
    //                     <tr role="row">
    //                         <th>#</th>
    //                         <th>Name</th>
    //                         <th>Email</th>
    //                         <th>Phone</th>
    //                         <th>Upload Date</th>
    //                         <th>Status</th>
    //                         <th>Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {resumes.map((data, index) => (
    //                         <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
    //                             <td>{index+1}</td>
    //                             <td>{data.name}</td>
    //                             <td>{data.email}</td>
    //                             <td>{data.phone}</td>
    //                             <td>{data.created_at}</td>
    //                             <td>
    //                             <SelectBoxDropdown 
    //                                 dataOptions={applicant_status}
    //                                 name={`${data.id}`}
    //                                 value={ _.isEmpty(selectedOption[`${data.id}`]) ? data.candidate_status : selectedOption[`${data.id}`] }
    //                                 handleStatusChange={(event)=>handleStatusChange(event,`${data.id}`)}
    //                             />
                                     
    //                             </td>
    //                             <td className="actions">
    //                                 {/* {data.resumePath ? ( */}
    //                                     <div>
    //                                         {/* href={`${API_URL}resume/view/${data.resumePath}`} */}
    //                                         <NavLink target="_blank" to={`/candidate/preview/${data.id}`} className="ms-2 cmn">
    //                                             <i className="fa fa-eye" aria-hidden="true"></i>
    //                                         </NavLink>
    //                                         <NavLink title="Candidate Communication" to={`/candidate/communication/${data.id}`} className="ms-2 cmn">
    //                                             <i className="fa fa-comment" aria-hidden="true"></i>
    //                                         </NavLink>
    //                                         <NavLink to={`/candidate/details/${data.id}`} className="ms-2 cmn">
    //                                             <i className="fa fa-edit" aria-hidden="true"></i>
    //                                         </NavLink>
    //                                         <a 
    //                                             className={"ms-2 cmn " + (index === sending ? 'disable' : '' ) }
    //                                             id={`mail_btn_${index}`}
    //                                             onClick={ () => sendMail(data.email, index) }
    //                                             style={{'cursor':'pointer'}}
    //                                         >
    //                                             <i className="fa fa-envelope" aria-hidden="true"></i>
    //                                         </a>
    //                                     </div>
    //                                 {/* ) : 'N/A'} */}
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>               
    //         )
    //     } else if (_.isEmpty(resumes)) {
    //         return (
    //             displayRecordNotFound('No Resume Found')
    //         )
    //     }
    // }

    /**method to handle the search fields */
    const _handleChange = (event) => {
        const {name, value} = event.target
        if(name === 'name')
            setName(value)

        if(name === 'email')
            setEmail(value)
        
        if(name === 'phone')
            setPhone(value)

        if(name === 'city')
            setCity(value)
        
        if(name === 'company')
            setCompany(value)

        if(name === 'minExp'){
            setMinExp(value)
            setMaxExp('')
            let newMax=[]
            let maxtstart = parseInt(value)+2;
            for (let i = maxtstart; i < maxtstart+7; i++) {
              newMax.push(i)
            }
            setMaxData([])
            setMaxData(newMax)
            
        }

        if(name === 'maxExp')
            setMaxExp(value)
        
        if(name === 'status')
            setStatus(value)
                
    }

    /*handle onChange event of the dropdown*/
    const _handleSkillChange = e => {
        setSkillsData(e);
        let skillsData = [];
        if(e){
            skillsData = e.map((data) => {
                return data.value
            })
        }
        setSkillsSearch(skillsData)
    }

    /*handle onChange event of the dropdown*/
    const _handleSubmit = () => {
        if(_.isEmpty(name) && _.isEmpty(email) && _.isEmpty(phone) && _.isEmpty(company) && _.isEmpty(city) && _.isEmpty(skillsSearch) && _.isEmpty(status) && _.isEmpty(minExp) && _.isEmpty(maxExp) )
            displayErrorMessage('Please input any search field first')
        
        if(!_.isEmpty(minExp) && _.isEmpty(maxExp))
          displayErrorMessage('Please select max experience')
          
        _getData('', {name, email, phone, city, company, skills : skillsSearch, sortingData: sortingOption, status, minExp, maxExp})
    }

    /*handle reset event*/
    const _handleReset = () => {
        setName('')
        setEmail('')
        setCompany('')
        setPhone('')
        setCity('')
        setSkillsData([])
        setSkillsSearch('')
        setMinExp('')
        setMaxExp('')
        setStatus('')
        setsortingOption({})
        _getData()
    }

    const {totalRecords, per_page , blocking, resumeList, currentPage, definedSkills, applicant_status, statusList } = resumes;
    
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
    
    return (
      <ResumeStyle>
        <BlockUI blocking={blocking} />

        <div className="page-header">
          <h3 className="page-title"> Resume List</h3>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card mb-4">
            <div className="card">
              <div className="card-body">
                <div className="template-demo mb-2">
                  <NavLink to={"/resume/add"}>
                    <button
                      type="button"
                      className="btn btn-primary btn-fw mb-2"
                    >
                      Upload Resume
                    </button>
                  </NavLink>
                  <NavLink to={"/resume/manual/add"}>
                    <button
                      type="button"
                      className="btn btn-primary btn-fw mb-2"
                      style={{ marginLeft: "10px" }}
                    >
                      Manual Upload Resume
                    </button>
                  </NavLink>
                  <hr className="mb-4" />
                </div>
                <form className="form-inline">
                  <div className="row">
                    <div className="col-md-3">
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
                    <div className="col-md-3">
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
                    <div className="col-md-3">
                      <input
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={(event) => _handleChange(event)}
                        className="form-control mb-2 mr-sm-2 col-md-6"
                        id="inlineFormInputName2"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="col-md-3">
                      <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(event) => _handleChange(event)}
                        className="form-control mb-2 mr-sm-2 col-md-6"
                        id="inlineFormInputName2"
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="row mt-2 mb-2">
                    <div className="col-md-3">
                      <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={(event) => _handleChange(event)}
                        className="form-control mb-2 mr-sm-2 col-md-6"
                        id="inlineFormInputName2"
                        placeholder="Company"
                      />
                    </div>
                    <div className="col-md-3">
                      <Select
                        placeholder={"Select Skills"}
                        isMulti
                        options={definedSkills}
                        onChange={_handleSkillChange}
                        value={skillsData}
                      />
                    </div>
                    
                    <div className="col-md-3">
                      <Form.Control as="select" name="status" value={status || ""}
                        onChange={(event) => _handleChange(event)} >
                        <option>Status</option>
                        {statusList?.map((country, index) => (
                          <option key={index} value={country.pid}>{country.name}</option>
                        ))}
                      </Form.Control>
                    </div>
                    <div className="col-md-3">
                      <Form.Control
                        as="select"
                        name="minExp"
                        value={minExp || ""}
                        onChange={(event) => _handleChange(event)}
                      >
                        <option value=''>Min Exp</option>
                        {min.map((value, index) => (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        ))}
                      </Form.Control>
                    </div>
                    <div className="col-md-3">
                      <Form.Control
                        as="select"
                        name="maxExp"
                        value={maxExp || ""}
                        onChange={(event) => _handleChange(event)}
                      >
                        <option value=''>Max Exp</option>
                        {max.map((value, index) => (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        ))}
                      </Form.Control>
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
                  <hr className="mb-4" />
                </form>

                {/* Pagination */}
                {/* <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                              <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                  <span aria-hidden="true">&laquo;</span>
                                  <span className="sr-only">Previous</span>
                                </a>
                              </li>
                              <li className="page-item"><a className="page-link" href="#">1</a></li>
                              <li className="page-item"><a className="page-link" href="#">2</a></li>
                              <li className="page-item"><a className="page-link" href="#">3</a></li>
                              <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                  <span aria-hidden="true">&raquo;</span>
                                  <span className="sr-only">Next</span>
                                </a>
                              </li>
                            </ul>
                        </nav> */}
                {/* Pagination ends */}
              </div>
            </div>
          </div>
          <div className="col-lg-12 grid-margin stretch-card mb-2">
            <div className="card card-cls">
              <div className="table-responsive">
                <div className="col-lg-12 p-3">
                  <a
                    onClick={(event) => _handleModalShowClick()}
                    className="btn btn-primary send-email"
                  >
                    Send Emails
                  </a>
                </div>
                {/* add note pop up modal */}
                {showModal ? (
                  <EmailModal
                    showModal={showModal}
                    handleModalClose={_handleModalCloseClick}
                    // addCommentData={_addResumeComment}
                    modalTitle="Email Body"
                    modalBody="Are you sure you wish to perform this action? This action is irreversible!"
                  />
                ) : null}
              </div>
              <div className="table-responsive">
                {_buildResumeListNew(resumeList, applicant_status)}
              </div>
            </div>
          </div>

          {total > per_page ? (
            <div aria-label="Page navigation example">
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

        {/* <h3>Resume List</h3>

            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <NavLink to={'/resume/add'} className="btn btn-primary mb-2">Upload Resume</NavLink>
                            <NavLink to={'/resume/manual/add'} className="btn btn-primary ml-1 mb-2" style={{"marginLeft" : "10px"}}>Manual Upload Resume</NavLink>
                        </div>

                        <div className="col-12">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="tab-pane">
                                        <form className="row gx-3 gy-2 align-items-center">
                                            <div className="col-sm-3">
                                                <label className="form-label visually-hidden">Name</label>
                                                <input type="text" className="form-control" placeholder="Name" name="name"
                                                    value={name} 
                                                    onChange={(event) => _handleChange(event)} />
                                            </div>
                                            <div className="col-sm-3">
                                                <label className="form-label visually-hidden">Email</label>
                                                <input type="text" className="form-control" placeholder="Email" name="email"
                                                    value={email} 
                                                    onChange={(event) => _handleChange(event)} />
                                            </div>
                                            <div className="col-sm-3">
                                                <label className="form-label visually-hidden" >Phone</label>
                                                <input type="text" className="form-control" placeholder="Phone" name="phone"
                                                    value={phone} 
                                                    onChange={(event) => _handleChange(event)} />
                                            </div>
                                            <div className="col-sm-3">
                                                <label className="form-label visually-hidden" >City</label>
                                                <input type="text" className="form-control" placeholder="City" name="city"
                                                    value={city} 
                                                    onChange={(event) => _handleChange(event)} />
                                            </div>
                                            <div className="col-sm-3">
                                                <label className="form-label visually-hidden" >Company</label>
                                                <input type="text" className="form-control" placeholder="Company" name="company" 
                                                    value={company} 
                                                    onChange={(event) => _handleChange(event)} />
                                            </div>
                                            <div className="col-sm-3">
                                                <Select placeholder={'Select Skills'} isMulti options={definedSkills} onChange={_handleSkillChange} value={skillsData}  />
                                            </div>
                                            <div className="col-sm-2">
                                                <Form.Control as="select" name="minExp" value={minExp || ''} onChange={(event) => _handleChange(event)}>
                                                    <option>Min Exp</option>
                                                    {min.map((value, index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                    ))}
                                                </Form.Control>
                                            </div>
                                            <div className="col-sm-2">
                                                <Form.Control as="select" name="maxExp" value={maxExp || ''} onChange={(event) => _handleChange(event)}>
                                                    <option>Max Exp</option>
                                                    {max.map((value, index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                    ))}
                                                </Form.Control>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-primary" type="button" 
                                                    onClick={() => _handleSubmit()}>Submit</button>
                                            </div>
                                            <div className="col-auto">
                                                <button className="btn btn-primary" type="button"
                                                    onClick={() => _handleReset()}>Reset</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="table-responsive">
                        {/* list of records */}
        {/* {_buildResumeList(resumeList,applicant_status)}
                        <div className="position-absolute">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>
                        {(total > per_page) ? 
                            <div className="pagination mb-3 pagination-content">
                                <Pagination
                                    activePage={currentPage}
                                    itemsCountPerPage={Number(per_page)}
                                    totalItemsCount={total}
                                    pageRangeDisplayed={5}
                                    onChange={_handlePageChange}
                                    itemclassName="page-item"
                                    linkclassName="page-link"
                                    innerclassName="pagination text-center"
                                /> 
                            </div> 
                        : ''} 
                    </div>
                </div> */}
        {/* </div> */}
      </ResumeStyle>
    );
}

export default ResumeList