import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink } from "react-router-dom"
import Pagination from "react-js-pagination"
import _ from 'lodash'
import Select from "react-select";
import { Form } from "react-bootstrap";
import ResumeStyle from './style';
import BlockUI from "../../components/BlockUI";
import SelectBoxDropdown from "../../components/SelectBoxDropdown";
import Checkbox from "../../components/Checkbox"
import { fetchResumeData, resetResumeData,updateStatusField, deleteResume } from "../../actions/Resume";
import { displayRecordNotFound, API_URL, displayErrorMessage } from '../../utils/helper';
import MultipleEmailModal from "../../components/MultipleEmailModal/MultipleEmailModal";
import SingleEmailModal from "../../components/SingleEmailModal/SingleEmailModal";
import Modal from '../../components/ConfirmationModal/Modal';
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
    const [statusShow, setStatusShow]               = useState('');
    const [sending, setSending]               = useState(null);
    const [selectedOption, setSelectedOption] = useState([]);
    const [selectedCheckBox, setSelectedCheckBox]         = useState([]);
    const [sortingOption, setsortingOption]   = useState({});
    const [min, setMinData]       = useState([1,2,3,4,5,6,7,8,9]);
    const [max, setMaxData]       = useState([2,3,4,5,6,7,8,9,10]);
    
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [singleMailModal, setSingleMailModal] = useState(false);
    const [showDelModal, setShowDelModal] = useState(false);
    const [list, setList] = useState([]);
    // const [isCheck, setIsCheck] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState('');
    const [mailId, setMailId] = useState('');

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
      setMailId(mail);
      setSingleMailModal(true); /*return;
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
      }*/
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
  
  const _handleSingleMailModalCloseClick = (value) => {
    setSending('');
    setSingleMailModal(value);
  }
  
  //const [selectedMailId, setSelectedMailId] = useState([]);
  const handleSelectOnly = (e) => {
      const { id, checked } = e.target;
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter(item => item !== id));
      }
  }

  /*method called to display modal*/
  function _handleDelModalShowClick(e,i){
    e.preventDefault();
    setShowDelModal(true);
    setSelectedRowId(i);
  }

  /*method called to when record deleted option is chosen*/
  const _deleteResumeData = (status) => {
    if(status) {
      dispatch(deleteResume(selectedRowId));  // action is called to get data
      _handleDelModalCloseClick(false);  //modal is closed
    }
  }

  const _handleDelModalCloseClick = (value) => {
    setShowDelModal(value);
  }
    
  const handleSelectAll = (resumeList) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(resumeList.map(li => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  }
    
    const _buildResumeListNew = (resumes,applicant_status) => {
        if (!_.isEmpty(resumes)) {
          return (
            <>
              <table className="table table-bordered mb-0 resume-list-table">
                <thead>
                  <tr>
                    <th>
                      <Checkbox
                        type="checkbox"
                        name="selectAll"
                        className="form-check-input"
                        id="selectAll flexCheckDefault"
                        handleClick={()=>handleSelectAll(resumes)}
                        isChecked={isCheckAll}
                      />&nbsp; #
                    </th>
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
                      <td>
                        <Checkbox
                          key={data.id}
                          className="form-check-input" 
                          type="checkbox"
                          name={data.id}
                          id={data.id}
                          handleClick={handleSelectOnly}
                          isChecked={isCheck.includes(data.id)}
                        />&nbsp; {index + 1}                         
                      </td>
                      
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
                          <Link
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
                          </Link>
                          <Link 
                            className="" 
                            title="Delete" 
                            className="ms-2" 
                            style={{'cursor':'pointer'}}
                            onClick={(event) => _handleDelModalShowClick(event, data.id)}>
                            <i className="mdi mdi-delete" aria-hidden="true"></i>
                          </Link>
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

    /**method to handle the search fields */
    const _handleChange = (event) => {
      const {name, value} = event.target
      if(name === 'name')
        setName(value);

      if(name === 'email')
        setEmail(value);
      
      if(name === 'phone')
        setPhone(value);

      if(name === 'city')
        setCity(value);
      
      if(name === 'company')
        setCompany(value);

      if(name === 'minExp'){
        setMinExp(value);
        setMaxExp('');
        let newMax=[];
        let maxtstart = parseInt(value)+2;
        for (let i = maxtstart; i < maxtstart+7; i++) {
          newMax.push(i);
        }
        setMaxData([]);
        setMaxData(newMax);          
      }

      if(name === 'maxExp')
        setMaxExp(value);
      
      if(name === 'status')
        setStatus(value);
                
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

    const _handleStatusSrcChange = e => {
      setStatus(e.value);
      setStatusShow(e.name);
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
                    
                    <div className="col-md-3 status">
                      <Select
                        placeholder={"Select Status"}
                        options={statusList}
                        onChange={_handleStatusSrcChange}
                        value={statusShow}
                      />
                    </div>
                    <div className="col-md-3 min-max d-flex">
                      <div className="col-md-5">
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
                      <div className="col-md-2"></div>
                      <div className="col-md-5">
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
              </div>
            </div>
          </div>
          <div className="col-lg-12 grid-margin stretch-card mb-2">
            <div className="card card-cls">
              <div className="table-responsive">
                <div className="col-lg-12 p-3">
                  <Link
                    onClick={(event) => _handleModalShowClick()}
                    className="btn btn-primary send-email"
                  >
                    Send Emails
                  </Link>
                </div>

                {showModal ? (
                  <MultipleEmailModal
                    showModal={showModal}
                    handleModalClose={_handleModalCloseClick}
                    // addCommentData={_addResumeComment}
                    sendMailData={isCheck}
                    modalTitle="Email Body"
                    modalBody="Are you sure you wish to perform this action? This action is irreversible!"
                  />
                ) : null}

                {singleMailModal ? (
                  <SingleEmailModal
                    singleMailModal={singleMailModal}
                    handleModalClose={_handleSingleMailModalCloseClick}
                    // addCommentData={_addResumeComment}
                    sendMailData={mailId}
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

        
        {/* delete pop up modal */}
        {showDelModal ? (
          <Modal 
            showModal={showDelModal} 
            handleModalClose={_handleDelModalCloseClick} 
            updateData={_deleteResumeData}
            modalTitle="Delete Record"
            modalBody="Are you sure you wish to perform this action? This action is irreversible!"
          />
        ) : null}
      </ResumeStyle>
    );
}

export default ResumeList