import React from 'react';
import { Link } from 'react-router-dom';

export const DeveloperResumeToPrint = React.forwardRef((props, ref) => {
 

    const _project_page = (project) =>{
        
        return (
            
             <div className="page inner" >
                <div className="header">
                <h2 className="emp-id">{ empCode }</h2>
                <img src="./assets/img/designer-resume-img/logo.png" className="logo" />
                </div>
                <div className="inner-content">
                <div className="two-col">
                    <div className="left-col">
                        <img src="./assets/img/designer-resume-img/projects-icon.png" style={{margin: '6px 0 0'}}/>
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
                    <span className="copyright-right">4</span>
                </div>
                </div>
            </div> 
            
        )
    }
    const {   projectArray , empCode, empTitle, candidateInfo } = props;

    // var projectArray = [];
    // if(candidateInfo?.project !== undefined){
    //     projectArray = _.chunk(candidateInfo.project, 4)
    // }
    const tabStyle = {
        height: 500,
        maxHeight: 300,
        overflow: "scroll"
        //backgroundColor: "blue"
      };
    return (
        // <Fragment>
            <div style={tabStyle}>
            <div ref={ref}>
             {/* Page 1 Start */}
            <div className="page main-page" PageSize="A4" style={{backgroundImage: 'url(./assets/img/designer-resume-img/web-capability-bg.png)'}}>
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
             {/* Page 1 end  */}
              {/* Page 2 Start  */}
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
                            {/* <li>Documenting features, technical specifications & infrastructure requirements.  </li>
                            <li>Working with a multi-disciplinary team to convert business needs into technical specifications Test the website and identify any technical problems</li>
                            <li>Upload the site onto a server and register it with different search engines.</li> */}
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
             {/* Page 2 end  */}

              {/* Page 3 Start  */}

            { // (projectArray !== undefined) ?  
               
            projectArray?.map((data,index) => ( 
                _project_page(data)
            // <div className="page inner no-height" key={index} >
            //     <div className="header">
            //     <h2 className="emp-id">{ empCode }</h2>
            //     <img src="./assets/img/designer-resume-img/logo.png" className="logo" />
            //     </div>
            //     <div className="inner-content">
            //     <div className="two-col">
            //         <div className="left-col">
            //             <img src="./assets/img/designer-resume-img/projects-icon.png" style={{margin: '6px 0 0'}}/>
            //         </div>
            //         <div className="right-col">
            //             <h2>Projects</h2>
            //         </div>
            //     </div>
            //     {/* { projectdata.map((data,index)=>( 
                    
            //     <div  className="two-col-line">
            //         <div className="left-col">
            //             <span className="circle-arrow"></span>
            //         </div>
            //         <div className="right-col">
            //             <h2>{ data.project_name}</h2>
            //             <p><strong>Description:</strong>{ data.project_description }</p>
            //             <p><strong>Role:</strong>{ data.role }</p>
            //             <p><strong>Technologies:</strong>{ data.technologies }</p>
            //             <Link to={data.project_link}>{ data.project_link }</Link>
            //         </div>
            //     </div>
               
            //     )) } */}
                
            //     <div className="copyright-footer">
            //         <span className="copyright-left">
            //         Copyright 2021 – Virtual Employee. All Rights Reserved</span>
            //         <span className="copyright-right">3</span>
            //     </div>
            //     </div>
            // </div>
            )) 
        // <div className="copyright-footer">
        //     <span className="copyright-left">
        //     Copyright lokesh    </span>
        //     <span className="copyright-right">3</span>
        // </div>
         }
             {/* Page 3 end  */}


             {/* Page 4 end  */}

              {/* Page 5 Start  */}
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
                            {/* <li><strong>Graduation</strong><span>BCA in Computer Science, Sikkim Manipal University —</span></li>
                                <li><strong>Intermediate</strong> <span>Intermediate, CBSE — 2006 - 2007
                                </span></li>
                                <li><strong>High School</strong> <span>CBSE — 2004 - 2005

                                </span></li> */}
                        </ul>
                    </div>
                </div>
                
                <div className="copyright-footer">
                    <span className="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span className="copyright-right">5</span>
                </div>
                </div>
            </div>
            

            </div>
            </div>
        
    )
})
