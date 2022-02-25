import React,{ Fragment, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { fetchCandidateData } from '../../../actions/Candidate'
import BlockUI from "../../../components/BlockUI";
import { DeveloperResumeToPrint } from './DeveloperResumeToPrint';
import { ComponentToPrint } from './ComponentToPrint'
import './DeveloperResume.css'
import _ from "lodash";
import ReactToPrint from 'react-to-print';

const DeveloperResume = (props) => {


    const candidateData = useSelector(state=> state.candidate)
    const location = useLocation();
    const dispatch = useDispatch()
    const [empCode, setEmpCode] = useState('') 
    const [empTitle, setEmpTitle] = useState('') 
    // const [projectArray, setProjectArray] = useState([]) 
    // const [isSet, setIsSet] = useState(false) 
    const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current,
    //    bodyClass:"printElement1"
    // });


    useEffect(() => {
       
       setEmpCode(location.state.templateData.emp_code);
       setEmpTitle(location.state.templateData.emp_title);
    
       if(location.state.templateData.candidate_name){
            dispatch(fetchCandidateData(location.state.templateData.candidate_name))
       }
    }, [location]);


    // const _project_page = (project) =>{
    //     console.log('project',project)
    //     return (
            
    //          <div className="page inner">
    //             <div className="header">
    //             <h2 className="emp-id">{ empCode }</h2>
    //             <img src="./assets/img/designer-resume-img/logo.png" className="logo" />
    //             </div>
    //             <div className="inner-content">
    //             <div className="two-col">
    //                 <div className="left-col">
    //                     <img src="./assets/img/designer-resume-img/projects-icon.png" style={{margin: '6px 0 0'}}/>
    //                 </div>
    //                 <div className="right-col">
    //                     <h2>Projects</h2>
    //                 </div>
    //             </div>
    //             { project?.map((data,index)=>( 
    //             <div className="two-col-line" key={index}>
    //                 <div className="left-col">
    //                     <span className="circle-arrow"></span>
    //                 </div>
    //                 <div className="right-col">
    //                     <h2>{ data.project_name}</h2>
    //                     <p><strong>Description:</strong>{ data.project_description }</p>
    //                     <p><strong>Role:</strong>{ data.role }</p>
    //                     <p><strong>Technologies:</strong>{ data.technologies }</p>
    //                     <Link to={data.project_link}>{ data.project_link }</Link>
    //                 </div>
    //             </div>
    //             )) }
    //             <div className="copyright-footer">
    //                 <span className="copyright-left">
    //                 Copyright 2021 – Virtual Employee. All Rights Reserved</span>
    //                 <span className="copyright-right">4</span>
    //             </div>
    //             </div>
    //         </div> 
            
    //     )
    // }
    const { blocking , candidateInfo} = candidateData;
    var projectArray = [];
    if(candidateInfo?.project !== undefined){
        projectArray = _.chunk(candidateInfo.project, 4)
    }

    return (
        <Fragment>
        <BlockUI blocking={blocking} /> 
        <div className="resumeCanvas">
            <div className="add-items row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  <h3 className="page-title" style={{fontWeight: '600'}}> Resume Preview</h3>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-end text-right">
                  <NavLink to="/select-resume">
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Back
                    </button>
                  </NavLink>
                  
                    <ReactToPrint
                        trigger={() => <button className="btn btn-gradient-primary btn-fw mb-2" >Download</button>}
                        content={() => componentRef.current}
                        bodyClass={"pagetoprint"}
                    />
                    {/* <button
                      type="button"
                      onClick={handlePrint}
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Download
                    </button> */}
                </div>
              </div>
             {/* Page 1 Start */}
             {/* <ComponentToPrint propsRef={componentRef} /> */}
             <DeveloperResumeToPrint ref={componentRef} projectArray={projectArray} empCode={empCode} empTitle={empTitle} candidateInfo={candidateInfo} />
            {/* <div className="page main-page" PageSize="A4" style={{backgroundImage: 'url(./assets/img/designer-resume-img/web-capability-bg.png)'}}>
                <section id="top-head-main" style={{backgroundImage: 'url(./assets/img/designer-resume-img/top-dotted-bg.png)'}}>
                <div className="page-container">
                    <div className="logo-main">
                        <img src="./assets/img/designer-resume-img/main-logo.png" />
                    </div>
                </div>
                </section>
                <section id="resource-profile">
                <div className="page-container">
                    <div className="resource-box">
                        <div className="resource-main">
                            <div className="resource-heading">
                            RESOURCE PROFILE
                            </div>
                            <div className="employee-id">
                            { empCode }
                            </div>
                            <div className="employee-profile">
                            { empTitle }
                            </div>
                            <div className="icon-main">
                            <ul className="icon-box">
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_1.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_2.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_3.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_4.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_5.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_6.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_7.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_8.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_9.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_10.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_11.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_12.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_13.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_14.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_15.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_16.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_17.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_18.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_19.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_20.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_21.png"/>
                                </li>
                                <li>
                                    <img src ="./assets/img/designer-resume-img/software-icon/icon_22.png"/>
                                </li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
                <section id="web-capability">
                <div className="page-container">
                    <div className="capability-box">
                        <h2>Get complete web capability </h2>
                        <div className="technology">PHP | FRAMEWORK | CMS | LMS | CRM | Ecommerce | UI/UX | Frontend </div>
                    </div>
                    <div className="copyright-footer">
                        <span className="copyright-left">
                        Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                        <span className="copyright-right">1</span>
                    </div>
                </div>
                </section>
            </div>
            
            <div className="page inner">
                <div className="header">
                    <h2 className="emp-id">{ empCode }</h2>
                    <img src="./assets/img/designer-resume-img/logo.png" className="logo" />
                </div>
                <div className="inner-content">
                 <div className="two-col">
                    <div className="left-col">
                        <img src="./assets/img/designer-resume-img/abt-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div className="right-col">
                        <h2>Core Competencies</h2>
                        <ul style={{marginTop: '20px'}}>
                            <li>Building PHP websites using PHP based frameworks and CMS. </li>
                            <li>Planning and conducting cross-browser usability testing against W3C.  </li>
                            <li>Testing and validating work produced as part of the development process. </li>
                            <li>Developing advanced database driven websites amd systems including eCommerce. </li>
                            <li>Back end development and maintenance of websites using PHP and MySQL.  </li>
                            <li>Developing web sites using MySQL, PHP, javascript & other programming tools.</li>
                        </ul>
                    </div>
                </div> 
                 <div className="two-col">
                    <div className="left-col">
                        <img src="./assets/img/designer-resume-img/tech-icon.png"/>
                    </div>
                    <div className="right-col">
                        <h2>Technical Skills</h2>
                        <div className="skills-div">
                            <div className="circle first">
                            Web<br /> Server & Hosting
                            <ul>
                                <li>AWS</li>
                                <li>GODaddy</li>
                                <li>LAMP</li>
                                <li>WAMP</li>
                            </ul>
                            </div>
                            <div className="circle second">
                            PHP<br /> MVC/CMS
                            <ul>
                                <li>PHP7</li>
                                <li>Laravel</li>
                                <li>Codeigniter</li>
                                <li>Magento</li>
                                <li>OpenCart</li>
                                <li>Core PHP</li>
                                <li>WordPress</li>
                                <li>Joomla</li>
                            </ul>
                            </div>
                            <div className="circle third">
                            Payment<br /> Gateway
                            <ul>
                                <li>Paypal Checkout</li>
                                <li>Google Checkout</li>
                                <li>PAYTM</li>
                                <li>BrainTree</li>
                            </ul>
                            </div>
                            <div className="circle fourth">
                            Frontend 
                            <ul>
                                <li>Angular</li>
                                <li>React</li>
                                <li>TypeScript</li>
                                <li>JavaScript</li>
                                <li>AJAX</li>
                                <li>HTML</li>
                                <li>CSS</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="two-col">
                    <div className="left-col">
                        <img src="./assets/img/designer-resume-img/tools-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div className="right-col">
                        <h2>Tools</h2>
                        <ul className="inline-list">
                            <li>Dreamweaver</li>
                            <li>Asana</li>
                            <li>Skype</li>
                            <li>Slack</li>
                            <li>Visual Studio Code</li>
                            <li>Sublime</li>
                            <li>Wrike</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright-footer">
                    <span className="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span className="copyright-right">2</span>
                </div> 
                </div>
            </div>
             

            { projectArray?.map((data,index) => ( 
                _project_page(data)
            )) }

            
            <div className="page inner last-page">
                <div className="header">
                <h2 className="emp-id">{ empCode }</h2>
                <img src="./assets/img/designer-resume-img/logo.png" className="logo" />
                </div>
                <div className="inner-content">
                <div className="two-col second">
                    <div className="left-col">
                        <img src="./assets/img/designer-resume-img/education-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div className="right-col">
                        <h2>Education</h2>
                        <ul style={{marginTop: '20px'}}>
                            { candidateInfo?.education?.map((edu,index)=>( 
                               
                                <li key={index} ><strong>{edu.degree}</strong><span>{edu.degree} in { edu.schoolOrCollege } — { edu.gradMonth +'-'+ edu.gradYear }</span></li>
                                
                                
                            ))}
                        </ul>
                    </div>
                </div>
                
                <div className="copyright-footer">
                    <span className="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span className="copyright-right">5</span>
                </div>
                </div>
            </div> */}
            
             {/* Page 5 end  */}
             <div className="add-items row mt-5">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2">
                  
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-2 text-end text-right">
                  <NavLink to="/select-resume">
                    <button
                      type="button"
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Back
                    </button>
                  </NavLink>
                  
                    {/* <button
                      type="button"
                      onClick={handlePrint}
                      className="btn btn-gradient-primary btn-fw mb-2"
                    >
                      Download
                    </button> */}
                    <ReactToPrint
                        trigger={() => <button className="btn btn-gradient-primary btn-fw mb-2" >Download</button>}
                        content={() => componentRef.current}
                        bodyClass={"pagetoprint"}
                    />
                </div>
              </div>
        </div>
        </Fragment>
    )
}

export default DeveloperResume;