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
import axios from 'axios';

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
    const [sending, setSending]               = useState(null);
    const [selectedOption, setSelectedOption]               = useState([]);
    /**fetched data from redux store */
    const resumes = useSelector(state => state.resume);
    const dispatch = useDispatch();
    const min = [1,2,3,4,5,6,7,8,9];
    const max = [2,3,4,5,6,7,8,9,10];
   
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
            skills  : params?.skills
        }
        dispatch(fetchResumeData(queryParams));
    }

    const handleStatusChange=(event,resume_id)=>{
        dispatch(updateStatusField({id:resume_id,candidate_status:event.target.value}))
        setSelectedOption(Object.assign({...selectedOption, [resume_id] : event.target.value }))
    }

    /**method for calling api based on page change  */
    const _handlePageChange = (pageNumber) => _getData(pageNumber, {name, email, phone, city, company, skills : skillsSearch});

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
    console.log(resumes);
    /* build resume list */
    const _buildResumeList = (resumes,applicant_status) => {
        if (!_.isEmpty(resumes)) {
            return (
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr role="row">
                            <th>SNO</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Upload Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumes.map((data, index) => (
                            <tr key={index} role="row" className={index % 2 === 0 ? "even" : "odd"}>
                                <td>{index+1}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                <td>{data.created_at}</td>
                                <td>
                                <SelectBoxDropdown 
                                    dataOptions={applicant_status}
                                    name={`${data.id}`}
                                    value={ _.isEmpty(selectedOption[`${data.id}`]) ? data.candidate_status : selectedOption[`${data.id}`] }
                                    handleStatusChange={(event)=>handleStatusChange(event,`${data.id}`)}
                                />
                                     
                                </td>
                                <td className="actions">
                                    {/* {data.resumePath ? ( */}
                                        <div>
                                            {/* href={`${API_URL}resume/view/${data.resumePath}`} */}
                                            <NavLink target="_blank" to={`/candidate/preview/${data.id}`} className="ms-2 cmn">
                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                            </NavLink>
                                            <NavLink title="Candidate Communication" to={`/candidate/communication/${data.id}`} className="ms-2 cmn">
                                                <i className="fa fa-comment" aria-hidden="true"></i>
                                            </NavLink>
                                            <NavLink to={`/candidate/details/${data.id}`} className="ms-2 cmn">
                                                <i className="fa fa-edit" aria-hidden="true"></i>
                                            </NavLink>
                                            <a 
                                                className={"ms-2 cmn " + (index === sending ? 'disable' : '' ) }
                                                id={`mail_btn_${index}`}
                                                onClick={ () => sendMail(data.email, index) }
                                                style={{'cursor':'pointer'}}
                                            >
                                                <i className="fa fa-envelope" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    {/* ) : 'N/A'} */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>                
            )
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
            setName(value)

        if(name === 'email')
            setEmail(value)
        
        if(name === 'phone')
            setPhone(value)

        if(name === 'city')
            setCity(value)
        
        if(name === 'company')
            setCompany(value)

        if(name === 'minExp')
            setMinExp(value)

        if(name === 'maxExp')
            setMaxExp(value)
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
        if(_.isEmpty(name) && _.isEmpty(email) && _.isEmpty(phone) && _.isEmpty(company) && _.isEmpty(city) && _.isEmpty(skillsSearch))
            displayErrorMessage('Please input any search field first')

        _getData('', {name, email, phone, city, company, skills : skillsSearch})
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
        _getData()
    }

    const {totalRecords, per_page , blocking, resumeList, currentPage, definedSkills, applicant_status } = resumes;
    
    let total = 0;
    if(typeof totalRecords != 'undefined')
        total = totalRecords;
    
    return (
        <ResumeStyle>
            <BlockUI blocking={blocking} />
            <h3>Resume List</h3>

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
                        {_buildResumeList(resumeList,applicant_status)}
                        <div class="position-absolute">Showing {currentPage*Number(per_page)-Number(per_page)} to {(currentPage*Number(per_page)> total)?total:currentPage*Number(per_page)} of {total} entries</div>
                        {(total > per_page) ? 
                            <div className="pagination mb-3 pagination-content">
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
        </ResumeStyle>
    )
}

export default ResumeList