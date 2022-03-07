import React from 'react';
import { Link } from 'react-router-dom';

export const DeveloperResumeToPrint = React.forwardRef((props, ref) => {
 

    const _project_page = (project,index) =>{
        
        return (
            
             <div className="page inner" >
                <div className="header">
                <h2 className="emp-id">{ empCode }</h2>
                <img src="../../assets/img/designer-resume-img/logo.png" className="logo" />
                </div>
                <div className="inner-content">
                <div className="two-col">
                    <div className="left-col">
                        <img src="../../assets/img/designer-resume-img/projects-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div className="right-col">
                        <h2>Projects</h2>
                    </div>
                </div>
                { project?.map((data,index)=>( 
                <div className="two-col-line" key={index}>
                    <div className="left-col">
                        <span className="circle-arrow"></span>
                    </div>
                    <div className="right-col">
                        <h2>{ data.project_name}</h2>
                        <p><strong>Description:</strong>{ data.project_description }</p>
                        <p><strong>Role:</strong>{ data.role }</p>
                        <p><strong>Technologies:</strong>{ data.technologies }</p>
                        <Link to={data.project_link}>{ data.project_link }</Link>
                    </div>
                </div>
                )) }
                <div className="copyright-footer">
                    <span className="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span className="copyright-right">{ index+3 }</span>
                </div>
                </div>
            </div> 
            
        )
    }
    const {   projectArray , empCode, empTitle, candidateInfo, empTools, coreCompetencie, skillsArray, empWebCompatibility } = props;

    return (
        // <Fragment>
          
            <div ref={ref}>
             {/* Page 1 Start */}
            <div className="page main-page" PageSize="A4" style={{backgroundImage: 'url(../../assets/img/designer-resume-img/web-capability-bg.png)'}}>
                <section id="top-head-main" style={{backgroundImage: 'url(../../assets/img/designer-resume-img/top-dotted-bg.png)'}}>
                <div className="page-container">
                    <div className="logo-main">
                        <img src="../../assets/img/designer-resume-img/main-logo.png" />
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
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_1.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_2.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_3.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_4.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_5.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_6.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_7.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_8.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_9.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_10.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_11.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_12.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_13.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_14.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_15.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_16.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_17.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_18.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_19.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_20.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_21.png"/>
                                </li>
                                <li>
                                    <img src ="../../assets/img/designer-resume-img/software-icon/icon_22.png"/>
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
                        <div className="technology">{ empWebCompatibility }</div>
                    </div>
                    <div className="copyright-footer">
                        <span className="copyright-left">
                        Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                        <span className="copyright-right">1</span>
                    </div>
                </div>
                </section>
            </div>
             {/* Page 1 end  */}
              {/* Page 2 Start  */}
            <div className="page inner">
                <div className="header">
                    <h2 className="emp-id">{ empCode }</h2>
                    <img src="../../assets/img/designer-resume-img/logo.png" className="logo" />
                </div>
                <div className="inner-content">
                 <div className="two-col">
                    <div className="left-col">
                        <img src="../../assets/img/designer-resume-img/abt-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div className="right-col">
                        <h2>Core Competencies</h2>
                        <ul style={{marginTop: '20px'}}>
                            { coreCompetencie.map( (data,index)=>( 
                            <li key={"coreCompetencie"+index}>{ data }</li>
                            )) }
                            {/*<li>Planning and conducting cross-browser usability testing against W3C.  </li>
                            <li>Testing and validating work produced as part of the development process. </li>
                            <li>Developing advanced database driven websites amd systems including eCommerce. </li>
                            <li>Back end development and maintenance of websites using PHP and MySQL.  </li>
                            <li>Developing web sites using MySQL, PHP, javascript & other programming tools.</li>
                             <li>Documenting features, technical specifications & infrastructure requirements.  </li>
                            <li>Working with a multi-disciplinary team to convert business needs into technical specifications Test the website and identify any technical problems</li>
                            <li>Upload the site onto a server and register it with different search engines.</li> */}
                        </ul>
                    </div>
                </div> 
                 <div className="two-col">
                    <div className="left-col">
                        <img src="../../assets/img/designer-resume-img/tech-icon.png"/>
                    </div>
                    <div className="right-col">
                        <h2>Technical Skills</h2>
                        <div className="skills-div">
                       
                            <div className="circle first">
                            Web<br /> Server & Hosting
                            <ul>
                            { (skillsArray.Server !== undefined)? 
                                 skillsArray.Server.map((data,index)=>(
                                    <li key={"skill-Server"+index} >{ data.skill }</li>
                                 )) 
                            :
                                <>
                                <li>Godaddy</li>
                                <li>Xampp</li>
                                <li>Wampp</li>
                                </>
                            }
                            </ul>
                            </div>
                       
                           
                            <div className="circle second">
                            PHP<br /> MVC/CMS
                            <ul>
                            { (skillsArray.Backend !== undefined)?  
                                 skillsArray.Backend.map((data,index)=>(
                                        <li key={"skill-Backend"+index}>{ data.skill }</li>
                                )) 
                             :
                                <>
                                <li>PHP</li>
                                <li>WordPress</li>
                                <li>Core PHP</li>
                                </>
                             }
                            </ul>
                            </div>
                        
                        
                            <div className="circle third">
                            Payment<br /> Gateway
                            <ul>
                                { (skillsArray.Other !== undefined)?
                                     skillsArray.Other.map((data,index)=>(
                                        <li key={"skill-Other"+index}>{ data.skill }</li>
                                )) 
                            :
                                <>
                                <li>Paypal Checkout</li>
                                <li>Google Checkout</li>
                                </>
                            }
                            </ul>
                            </div>
                            
                        
                            <div className="circle fourth">
                            Frontend 
                            <ul>
                                { (skillsArray.Frontend !== undefined)?
                                skillsArray.Frontend.map((data,index)=>(
                                        <li key={"skill-Frontend"+index}>{ data.skill }</li>
                                )) 
                                :
                                <>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                                </>
                                }
                            </ul>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="two-col">
                    <div className="left-col">
                        <img src="../../assets/img/designer-resume-img/tools-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div className="right-col">
                        <h2>Tools</h2>
                        <ul className="inline-list">
                            {   empTools.split(',').map((data,index)=>(
                                    <li>{data}</li>
                                )) 
                            }
                            {/* <li>Dreamweaver</li>
                            <li>Asana</li>
                            <li>Skype</li>
                            <li>Slack</li>
                            <li>Visual Studio Code</li>
                            <li>Sublime</li>
                            <li>Wrike</li> */}
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
             {/* Page 2 end  */}

              {/* Page 3 Start  */}

            { // (projectArray !== undefined) ?  
               
                projectArray?.map((data,index) => ( 
                    _project_page(data,index)
                
                )) 
            }
            {/* Page 3 end  */}

            {/* Page 5 Start  */}
            <div className="page inner last-page">
                <div className="header">
                <h2 className="emp-id">{ empCode }</h2>
                <img src="../../assets/img/designer-resume-img/logo.png" className="logo" />
                </div>
                <div className="inner-content">
                    <div className="two-col second">
                        <div className="left-col">
                            <img src="../../assets/img/designer-resume-img/education-icon.png" style={{margin: '6px 0 0'}}/>
                        </div>
                        <div className="right-col">
                            <h2>Education</h2>
                            <ul style={{marginTop: '20px'}}>
                                { candidateInfo?.education?.map((edu,index)=>( 
                                
                                    <li key={"education"+index} ><strong>{edu.degree}</strong><span>{edu.degree} in { edu.schoolOrCollege } — { edu.gradMonth +'-'+ edu.gradYear }</span></li>
                                    
                                    
                                ))}
                                
                            </ul>
                        </div>
                    </div>
                    
                    <div className="copyright-footer">
                        <span className="copyright-left">
                        Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                        <span className="copyright-right">{ projectArray.length +3 }</span>
                    </div>
                </div>
            </div>
            {/* Page 5 End  */}
            </div>
        
    )
})
