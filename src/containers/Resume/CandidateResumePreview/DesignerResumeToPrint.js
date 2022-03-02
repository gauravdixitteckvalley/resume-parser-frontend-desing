import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './DesignerResume.css'


export const DesignerResumeToPrint = React.forwardRef((props, ref) => {
    var pindex = 1;
    const _project_page =(project,index)=>{

        return (
        <div className="page fifth-page">
                <div className="header innerpage-header">
                    <div className="logo_bg">
                        <img src="../../assets/img/designer-images/logo.png"/>
                        <p className="empcode">{ empCode }</p>
                    </div>	
                </div>
                
                <div className="page-inner inner-page" style={{paddingRight: '20px'}}>	
                    <div style={{pageBreakInside: 'avoid'}}>&nbsp;</div>
                    <h1 className="inner-heading"><span>Portfolio</span></h1>	
                    <img src="../../assets/img/designer-images/quote-icon.png"/>
                    {  project?.map((data,innerindex)=>( 
                    <>   
                    { (index===0 && innerindex ===0)?  
                    <h2>Created strong design concepts and developed design layouts for a variety of creative projects, you can see more at my portfolio.</h2>
                    :''}
                    <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">{pindex}</h5>
                        </div>
                        <div className="col-right">
                            <h4>{data.project_name}</h4>
                            <p><strong>Description:</strong>{ data.project_description }</p>
                            <p><strong>Role:</strong> { data.role}</p>
                            {/* <p><strong>Responsibilities:</strong></p>
                            <ul>
                                <li>Created UI Mopckups and implemented that design into Drupal templates</li>
                                <li>Created the website Cross Browser (Chrome, IE, Firefox and Safari) compatible and optimizing the web pages for a good performance.</li>
                                <li>Using the pre-processing platforms, such as SASS</li>
                                <li>Managing & providing design support to Development team</li>
                            </ul> */}
                            <p><strong>Technologies: </strong> { data.technologies }</p>
                            <p><strong>Project URL: </strong> { data.project_link }</p>
                        </div>
                        
                    
                    </div>
                    <br />
                
                    </>
                    )) }
                    {/* <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">02.</h5>
                        </div>
                        <div className="col-right">
                            <h4>iDstyle</h4>
                            <p><strong>Description:</strong> iDStyle is one of Australia's oldest web design and hosting companies.</p>
                            <p><strong>Role:</strong> Sr. Front-end Developer</p>
                            <p><strong>Responsibilities:</strong></p>
                            <ul>
                                <li>Created UI mockups and HTML and implemented that into Wordpress and  Joomla CMS</li>
                                <li>Created the responsive website and Cross Browser (Chrome, IE, Firefox and Safari) compatible</li>
                                <li>Client Interaction through Skype and Email</li>
                            </ul>
                            <p><strong>Technologies: </strong> Photoshop, Illustrator, HTML, CSS, Bootstrap, Google Fonts,</p>	
                        </div>
                        
                    
                    </div> */}
                    
                </div>
                
                    
                <div className="copyright-footer"><span className="copyright">Copyright 2021 – Virtual Employee. All Rights Reserved</span> <span className="copyright-box">4</span></div>

            </div>
        )   

    }
    const {   projectArray , empCode, empTitle, candidateInfo, empTools, coreCompetencie, skillsArray } = props;

    return (
        <div ref={ref}>
            
            <div className="page first-page">
                <div className="header">
                    <div className="logo_bg">
                        <img src="../../assets/img/designer-images/logo.png"/>
                        <p className="empcode">{ empCode }</p>
                    </div>	
                </div>
                
                <div className="page-inner">	
                    <div style={{pageBreakInside: 'avoid'}}>&nbsp;</div>
                        <ul className="icon-container">
                            <li><img src ="../../assets/img/designer-images/tech-icon/1icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/2icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/3icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/4icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/5icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/6icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/7icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/8icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/9icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/10icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/11icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/12icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/13icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/14icon.png"/></li>
                            <li><img src ="../../assets/img/designer-images/tech-icon/15icon.png"/></li>	
                        </ul>
                        <h1>I am working as 
                            <br />{ empTitle }</h1>
                            
                        <p style={{fontSize:'24px', margin: '30px 0'}}>Working with a strong focus on design and user<br /> experience. I create digital experiences for brands<br /> and companies.</p>
                        
                        <h2 className="margin-top">Get complete web capability </h2>		
                </div> 
                <p className="orange tech">PHP | FRAMEWORK | CMS | LMS | CRM | Ecommerce | UI/UX | Frontend </p>
                <div className="copyright-footer"><span className="copyright">Copyright 2021 – Virtual Employee. All Rights Reserved</span> <span className="copyright-box">1</span></div>
            </div>

            <div className="page second-page">
                <div className="header innerpage-header">
                    <div className="logo_bg">
                        <img src="../../assets/img/designer-images/logo.png"/>
                        <p className="empcode">{ empCode }</p>
                    </div>	
                </div>
                
                <div className="page-inner inner-page">	
                    <div style={{pageBreakInside: 'avoid'}}>&nbsp;</div>
                    <h1 className="inner-heading"><span>Core Competencies</span></h1>	
                    <img src="../../assets/img/designer-images/quote-icon.png"/>
                    <h2>We design websites with conversions in mind, our websites look great, but each page has a clearly deﬁned conversion goal. </h2>
                    <ul>
                        { coreCompetencie.map(( data, index)=>(                         
                            <li style={{lineHeight: '1.5'}}>{ data }</li>
                        )) }
                        {/* <li style={{lineHeight: '1.5'}}>Proficient in Graphic Design, Website Design, UI Design and Front-end development.</li>
                        <li style={{lineHeight: '1.5'}}>Understanding of Cross/Mobile Browser (Chrome, IE, Firefox and Safari) and Creating SEO friendly HTML with Website Optimization.</li>
                        <li style={{lineHeight: '1.5'}}>Implement HTML into Wordpress and Joomla.</li>
                        <li style={{lineHeight: '1.5'}}>Experience of pre-processing platforms, such as SASS and LESS.</li>
                        <li style={{lineHeight: '1.5'}}>Worked with project teams to create user-friendly and appealing application interfaces and websites for users. </li>
                        <li style={{lineHeight: '1.5'}}>Managing & providing designing support to the team and managed the team members for efficient management work.</li> */}
                    </ul>
                    <h1 className="inner-heading" style={{marginTop:'100px'}}><span>Tools</span></h1>
                    {/* {   empTools.split(',').map((data,index)=>(
                            <li>{data}</li>
                        )) 
                    } */}
                    <p>{empTools}</p>
                </div>
                
                
                <div className="copyright-footer"><span className="copyright">Copyright 2021 – Virtual Employee. All Rights Reserved</span> <span className="copyright-box">2</span></div>
                
            </div>
            <div className="page third-page">
                <div className="header innerpage-header">
                    <div className="logo_bg">
                        <img src="../../assets/img/designer-images/logo.png"/>
                        <p className="empcode">{ empCode }</p>
                    </div>	
                </div>
                
                <div className="page-inner inner-page">	
                    <div style={{pageBreakInside: 'avoid'}}>&nbsp;</div>
                    <h1 className="inner-heading"><span>Skill</span></h1>	
                    <img src="../../assets/img/designer-images/quote-icon.png"/>
                    <h2>Good Design Keeps the User Happy, the Manufacturer in the Black and the Aesthete Unoffended</h2>
                    
                    <div className="col-three-col">
                        <div className="col">
                            <h3><span>01.</span> Thinking</h3>
                            <p>Provided creative ideas and constructive feedback to other visual and non-visual thinkers or designers.</p>
                        </div>
                        <div className="col">
                            <h3><span>02.</span> Design</h3>
                            <p>Prototyped visual design concepts, designed icons, and provided solution for a new navigations systems</p>
                        </div>
                        <div className="col">
                            <h3><span>03.</span> Code</h3>
                            <p>Write front-end HTML5 code in text editor to implement the user interface designs for new products</p>
                        </div>
                    
                    </div>
                    
                    {/* <div className="app-tech">
                        <div className="app-tech-inner">
                            <span>Front-end</span>
                            <img src ="../../assets/img/designer-images/tech-icon/1icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/2icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/3icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/4icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/5icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/6icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/7icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/8icon.png"/>
                        </div>
                        <div className="app-tech-inner">
                            <span>Design</span>
                            <img src ="../../assets/img/designer-images/tech-icon/9icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/10icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/11icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/12icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/13icon.png"/>
                            
                        </div>
                        <div className="app-tech-inner">
                            <span>CMS</span>
                            <img src ="../../assets/img/designer-images/tech-icon/14icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/15icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/16icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/17icon.png"/>
                            <img src ="../../assets/img/designer-images/tech-icon/18icon.png"/>
                        </div>
                    </div> */}
                    <div className="two-col">
                        <div className="right-col">
                            <div className="skills-div">
                        
                                <div className="circle first">
                                Web<br /> Server & Hosting
                                <ul>
                                { (skillsArray.Server !== undefined)? 
                                 skillsArray.Server.map((data,index)=>(
                                    <li>{ data.skill }</li>
                                 )) 
                                :   <>
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
                                        <li>{ data.skill }</li>
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
                                        <li>{ data.skill }</li>
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
                                        <li>{ data.skill }</li>
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
                    
                </div>
                
                    
                <div className="copyright-footer"><span className="copyright">Copyright 2021 – Virtual Employee. All Rights Reserved</span> <span className="copyright-box">3</span></div>

            </div>

            {   
               projectArray?.map((data,index) => ( 
                   _project_page(data,index)
               
               )) 
           }
            {/* <div className="page fifth-page">
                <div className="header innerpage-header">
                    <div className="logo_bg">
                        <img src="../../assets/img/designer-images/logo.png"/>
                        <p className="empcode">{ empCode }</p>
                    </div>	
                </div>
                
                <div className="page-inner inner-page" style={{paddingRight: '20px'}}>	
                    <div style={{pageBreakInside: 'avoid'}}>&nbsp;</div>
                    <h1 className="inner-heading"><span>Portfolio</span></h1>	
                    <img src="../../assets/img/designer-images/quote-icon.png"/>
                    <h2>Created strong design concepts and developed design layouts for a variety of creative projects, you can see more at my portfolio.</h2>
                    
                    <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">01.</h5>
                        </div>
                        <div className="col-right">
                            <h4>Energy Central</h4>
                            <p><strong>Description:</strong> Energy Central has been a hub for news and content for electric power industry professionals.</p>
                            <p><strong>Role:</strong> UI/UX Lead</p>
                            <p><strong>Responsibilities:</strong></p>
                            <ul>
                                <li>Created UI Mopckups and implemented that design into Drupal templates</li>
                                <li>Created the website Cross Browser (Chrome, IE, Firefox and Safari) compatible and optimizing the web pages for a good performance.</li>
                                <li>Using the pre-processing platforms, such as SASS</li>
                                <li>Managing & providing design support to Development team</li>
                            </ul>
                            <p><strong>Technologies: </strong> Photoshop, HTML, CSS, Sass, Bootstrap, jQuery and Javascript</p>
                            <p><strong>Project URL: </strong> www.energycentral.com</p>
                        </div>
                        
                    
                    </div>
                    <br />
                    <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">02.</h5>
                        </div>
                        <div className="col-right">
                            <h4>iDstyle</h4>
                            <p><strong>Description:</strong> iDStyle is one of Australia's oldest web design and hosting companies.</p>
                            <p><strong>Role:</strong> Sr. Front-end Developer</p>
                            <p><strong>Responsibilities:</strong></p>
                            <ul>
                                <li>Created UI mockups and HTML and implemented that into Wordpress and  Joomla CMS</li>
                                <li>Created the responsive website and Cross Browser (Chrome, IE, Firefox and Safari) compatible</li>
                                <li>Client Interaction through Skype and Email</li>
                            </ul>
                            <p><strong>Technologies: </strong> Photoshop, Illustrator, HTML, CSS, Bootstrap, Google Fonts,</p>	
                        </div>
                        
                    
                    </div>
                    
                </div>
                
                    
                <div className="copyright-footer"><span className="copyright">Copyright 2021 – Virtual Employee. All Rights Reserved</span> <span className="copyright-box">4</span></div>

            </div>
            <div className="page fifth-page">
                <div className="header innerpage-header">
                    <div className="logo_bg">
                        <img src="../../assets/img/designer-images/logo.png"/>
                        <p className="empcode">{ empCode }</p>
                    </div>	
                </div>
                
                <div className="page-inner inner-page" style={{paddingRight: '20px'}}>	
                    <div style={{pageBreakInside:'avoid'}}>&nbsp;</div>
                    <h1 className="inner-heading"><span>Portfolio</span></h1>	
                    
                    <div className="col-two-col-second">
                        <div className="col-left"></div>
                        <div className="col-right">
                            <p>Fontawesome, Sass, Joomla, Wordpress, and jQuery</p>
                            <p><strong>Project's URL: </strong> www.idstyle.com , www.albanycreekcrushers.com.au ,
                www.sewingmachinesaustralia.com.au , www.pcgeek.com.au , www.stjohnscathedral.com.au , www.betterweb.com.au , www.acldesignertiles.com.au</p>				
                        </div>	
                    </div>
                    <br />
                    <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">03.</h5>
                        </div>
                        <div className="col-right">
                            <h4>Man Made Customs</h4>
                            <p><strong>Description:</strong> Man Made Customs is more than a marketplace; Man Made Customs are a community of craftsmen, outdoorsmen, and food and drink enthusiasts dedicated to keeping our trades alive by creating products that keep you in the fight for adventure.</p>
                            <p><strong>Role:</strong> Sr. Website Designer</p>
                            <p><strong>Responsibilities:</strong></p>
                            <ul>
                                <li>Created the responsive website with Cross Browser (Chrome, IE, Firefox and Safari) compatible</li>
                                <li>Provided design support to Development team</li>
                            </ul>
                            <p><strong>Technologies: </strong> Photoshop, Illustrator, HTML, CSS, Bootstrap and jQuery</p>
                            <p><strong>Project URL: </strong> www.manmadecustoms.com</p>
                        </div>
                        
                    
                    </div>

                    <br />
                    <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">04.</h5>
                        </div>
                        <div className="col-right">
                            <h4>J&K Tourism </h4>
                            <p><strong>Description:</strong> The Department of Tourism, J&K is the main developmental, promotional and regulatory arm of the J&K Government. Its main role comprises of:· Overall planning and execution of schemes for the development, up-gradation and improvement of the tourism infrastructure in different parts of the State.</p>
                            <p><strong>Role:</strong> Creative & Web Designer</p>
                            <p><strong>Responsibilities:</strong></p>
                            <ul>
                                <li>Created the website layout and HTML after that converted that into Joomla</li>					
                            </ul>
                            <p><strong>Technologies:</strong> Photoshop, HTML, CSS and Joomla</p>
                            <p><strong>Project URL:</strong> www.jktourism.org</p>
                        </div>
                        
                    
                    </div>
                    
                </div>
                
                    
                <div className="copyright-footer"><span className="copyright">Copyright 2021 – Virtual Employee. All Rights Reserved</span> <span className="copyright-box">5</span></div>

            </div> */}
            <div className="page sixth-page" style={{marginBottom: '0'}}>
                <div className="header innerpage-header">
                    <div className="logo_bg">
                        <img src="../../assets/img/designer-images/logo.png"/>
                        <p className="empcode">{ empCode }</p>
                    </div>	
                </div>
                
                <div className="page-inner inner-page" style={{paddingRight: '20px'}}>	
                    <div style={{pageBreakInside:'avoid'}}>&nbsp;</div>
                    <h1 className="inner-heading"><span>Education</span></h1>	
                    <img src="../../assets/img/designer-images/quote-icon.png"/>
                    <h2>Education is not the learning of facts, but the training of the mind to think. Education is a gift that none can take away. I am still learning every day.</h2>
                    { candidateInfo?.education?.map((edu,index)=>( 
                                
                        // <li key={index} ><strong>{edu.degree}</strong><span>{edu.degree} in { edu.schoolOrCollege } — { edu.gradMonth +'-'+ edu.gradYear }</span></li>
                        <>        
                        <div className="col-two-col-second">
                            <div className="col-left">
                                <h5 className="orange-box">{ index+1 }</h5>
                            </div>
                            <div className="col-right">
                                <h4>{edu.schoolOrCollege}</h4>
                                <p>{edu.degree}</p>
                                <p><strong>{ edu.gradMonth +'-'+ edu.gradYear }</strong></p>
                                
                            </div>
                            
                        
                        </div>
                        <br />
                        </>       
                                
                    ))}
                    
                    {/* <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">02.</h5>
                        </div>
                        <div className="col-right">
                            <h4>Delhi University</h4>
                            <p>Graduated (B.A Programme)</p>
                            <p><strong>2007 - 2010</strong></p>
                        </div>
                        
                    
                    </div>
                    
                    <br />
                    <div className="col-two-col-second">
                        <div className="col-left">
                            <h5 className="orange-box">03.</h5>
                        </div>
                        <div className="col-right">
                            <h4>Arena Animation</h4>
                            <p>Two and half year AASP Advance Diploma Certificate </p>
                            <p><strong>2007 - 2010</strong></p>
                        </div>
                        
                    
                    </div> */}
                    
                </div>
                
                    
                <div className="copyright-footer"><span className="copyright">Copyright 2021 – Virtual Employee. All Rights Reserved</span> <span className="copyright-box">6</span></div>

            </div>
            
        </div>
    )
})

// export default DesignerResumeToPrint;