import React from 'react';
import { Link } from 'react-router-dom';

import './DeveloperResume.css'


const DeveloperResume = () => {
    return (
        <div className="resumeCanvas">
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
                            VE-HM-1219
                            </div>
                            <div className="employee-profile">
                            Sr. Software Engineer (Full Stack)
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
                    <h2 className="emp-id">VE-HM-1219</h2>
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
                            <li>Documenting features, technical specifications & infrastructure requirements.  </li>
                            <li>Working with a multi-disciplinary team to convert business needs into technical specifications Test the website and identify any technical problems</li>
                            <li>Upload the site onto a server and register it with different search engines.</li>
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
                <div className="copyright-footer">
                    <span className="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span className="copyright-right">2</span>
                </div> 
                </div>
            </div>
             {/* Page 2 end  */}

              {/* Page 3 Start  */}
            <div className="page inner">
                <div className="header">
                <h2 className="emp-id">VE-HM-1219</h2>
                <img src="./assets/img/designer-resume-img/logo.png" className="logo" />
                </div>
                <div className="inner-content">
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
                <div className="two-col">
                    <div className="left-col">
                        <img src="./assets/img/designer-resume-img/projects-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div className="right-col">
                        <h2>Projects</h2>
                    </div>
                </div>
                <div className="two-col-line">
                    <div className="left-col">
                        <span className="circle-arrow"></span>
                    </div>
                    <div className="right-col">
                        <h2>LTPH</h2>
                        <p><strong>Description:</strong>LTPH is the ongoing portal where finance company manage their dealers and Dealers
                            records each customer deals. Finance users have privilege to create multiple Dealers, generate
                            documents for lease’s and proposal and generate report to analysis sales/purchases. The front end of this
                            portal is <strong>Angular 9, ngRx</strong>
                            </p>
                        <p><strong>Role:</strong>Full Stack Developer</p>
                        <p><strong>Technologies:</strong>Angular 9, Laravel, Javascript, Mysql, HTML, CSS</p>
                    </div>
                </div>
                <div className="two-col-line">
                    <div className="left-col">
                        <span className="circle-arrow"></span>
                    </div>
                    <div className="right-col">
                        <h2>BRED.</h2>
                        <p><strong>Description:</strong>:Bred is the web based sneakers market where users can buy and sell their sneakers. Theycan also make a bid or ask for the sneakers. The website is completely operational on Canada. The website also have mobile app which build on Ionic, Angular.
                        </p>
                        <p><strong>Role:</strong>Full Stack Developer</p>
                        <p><strong>Technologies:</strong>  Ionic, Cordova, Angular 8, Laravel, Javascript, Mysql, HTML, CSS</p>
                        <Link to="https://www.bredofficial.ca">https://www.bredofficial.ca</Link>
                    </div>
                </div>
                <div className="two-col-line">
                    <div className="left-col">
                        <span className="circle-arrow"></span>
                    </div>
                    <div className="right-col">
                        <h2>Backstreet Academy</h2>
                        <p><strong>Description:</strong>Backstreet Academy is the platform where Host list their course and guests particiate the
                            course. Host can scheule their couse week wise and day wise. There are two type of host one is
                            Independent Host and second is BA Host. Independent Host manage their account individually while BA
                            host account is manage by admin. There are two type of admin Super admin and city admin. There is also
                            a facilitator who commuicate with guests. This Website have Paypal payment gateway integrated. Guest
                            can make Instant booking or make Booking request depend on course. The front end was developed on
                            Angular 4 and backend was in Laravel.
                            </p>
                            <p><strong>Role:</strong>Full Stack Developer</p>
                        <p><strong>Technologies:</strong>Angular 4, Laravel, Javascript, Mysql, HTML, CSS
                        </p>
                        <Link to="http://www.backstreetacademy.com">http://www.backstreetacademy.com</Link>
                    </div>
                </div>
                <div className="two-col-line">
                    <div className="left-col">
                        <span className="circle-arrow"></span>
                    </div>
                    <div className="right-col">
                        <h2>Payroll</h2>
                        <p><strong>Description:</strong>: Payroll is the online portal through which entrepreneur and accountants can manage their
                            payroll or manage it for their clients respectively. It’s have lot of features like storage, paystubs, clock
                            in/clock out, monthly/yearly plans, Time off request, employee scheduling, Addon’s functionality, Accurals
                            calculatotors etc. This portal have paypal payment gateway and Currently it’s targeting to United State.</p>
                        <p><strong>Role:</strong>Software Developer</p>
                        <p><strong>Technologies:</strong> Laravel, Javascript, Mysql, HTML, CSS</p>
                        <Link to="https://www.payrollpriority.com">https://www.payrollpriority.com/</Link>
                    </div>
                </div>
                <div className="copyright-footer">
                    <span className="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span className="copyright-right">3</span>
                </div>
                </div>
            </div>
             {/* Page 3 end  */}

              {/* Page 4 Start  */}
            <div class="page inner">
                <div class="header">
                <h2 class="emp-id">VE-HM-1219</h2>
                <img src="./assets/img/designer-resume-img/logo.png" class="logo" />
                </div>
                <div class="inner-content">
                <div class="two-col">
                    <div class="left-col">
                        <img src="./assets/img/designer-resume-img/projects-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div class="right-col">
                        <h2>Projects</h2>
                    </div>
                </div>
                <div class="two-col-line">
                    <div class="left-col">
                        <span class="circle-arrow"></span>
                    </div>
                    <div class="right-col">
                        <h2>ARG Finance</h2>
                        <p><strong>Description:</strong>ARG Finance is Melbourne's trusted mortgage broker. ARG mortgage brokers find the right
                            home loan and business loans options for you. Calculators and Financial Tools which is used for -: To
                            have your finances in order, you need to plan your budget, calculate your loans, savings and credits.
                            Once you have this information in place, you will know the possible impact of these variables and the
                            amortization schedule. This will then help you understand opportunities, and motivate you to achieve your
                            financial goals.To help you out we’ve put together a collection of over 15 free calculators that will allow
                            you to work through a number of scenarios and help plan your financial situation.
                            </p>
                        <p><strong>Role:</strong> Software Developer</p>
                        <p><strong>Technologies:</strong>: WordPress</p>
                        <Link to="https://argfinance.com.au/">https://argfinance.com.au/</Link>
                    </div>
                </div>
                <div class="two-col-line">
                    <div class="left-col">
                        <span class="circle-arrow"></span>
                    </div>
                    <div class="right-col">
                        <h2>RisaBags</h2>
                        <p><strong>Description:</strong> Created an E-commerce web application with products and shipment functionality</p>
                        <p><strong>Role:</strong>Software Developer</p>
                        <p><strong>Technologies:</strong>WordPress, WooCommerce</p>
                        <Link to="https://www.risabags.com/">https://www.risabags.com/</Link>
                    </div>
                </div>
                <div class="two-col-line">
                    <div class="left-col">
                        <span class="circle-arrow"></span>
                    </div>
                    <div class="right-col">
                        <h2>Apt Mortgages</h2>
                        <p><strong>Description:</strong> gages
                            Description: Our experienced brokers specialize in Home Loans, Refinances, Commercial Loans,
                            Construction Loans and Personal Loans in Melbourne.Create a web application for their busniess</p>
                        <p><strong>Role:</strong>Software Developer</p>
                        <p><strong>Technologies:</strong>WordPress</p>
                        <Link to="http://www.aptmortgages.com.au/">http://www.aptmortgages.com.au/</Link>
                    </div>
                </div>
                <div class="two-col-line">
                    <div class="left-col">
                        <span class="circle-arrow"></span>
                    </div>
                    <div class="right-col">
                        <h2>Eikowa</h2>
                        <p><strong>Description:</strong>: Discover a curated collection of authentic artwork by leading contemporary Indian artists on
                            India's leading and most trusted online art gallery - Eikowa.com. Create a online art gallery for their
                            business.
                            </p>
                        <p><strong>Role:</strong>Software Developer</p>
                        <p><strong>Technologies:</strong>WordPress</p>
                        <Link to="https://www.eikowa.com/">https://www.eikowa.com/</Link>
                    </div>
                </div>
                <div class="two-col-line">
                    <div class="left-col">
                        <span class="circle-arrow"></span>
                    </div>
                    <div class="right-col">
                        <h2>Mutual Conveyancing</h2>
                        <p><strong>Description:</strong>A mortagages broker website for their business.</p>
                        <p><strong>Role:</strong>: Software Developer                     </p>
                        <p><strong>Technologies:</strong>A mortagages broker website for their business</p>
                        <Link to="https://www.mutualconveyancing.com.au/">https://www.mutualconveyancing.com.au/</Link>
                    </div>
                </div>
                <div class="copyright-footer">
                    <span class="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span class="copyright-right">4</span>
                </div>
                </div>
            </div>
             {/* Page 4 end  */}

              {/* Page 5 Start  */}
            <div class="page inner last-page">
                <div class="header">
                <h2 class="emp-id">VE-HM-1219</h2>
                <img src="./assets/img/designer-resume-img/logo.png" class="logo" />
                </div>
                <div class="inner-content">
                <div class="two-col second">
                    <div class="left-col">
                        <img src="./assets/img/designer-resume-img/education-icon.png" style={{margin: '6px 0 0'}}/>
                    </div>
                    <div class="right-col">
                        <h2>Education</h2>
                        <ul style={{marginTop: '20px'}}>
                            <li><strong>MCA</strong><span>MCA in Computer Science, Sikkim Manipal University — 2010 - 2012</span></li>
                            <li><strong>Graduation</strong><span>BCA in Computer Science, Sikkim Manipal University —</span></li>
                            <li><strong>Intermediate</strong> <span>Intermediate, CBSE — 2006 - 2007
                            </span></li>
                            <li><strong>High School</strong> <span>CBSE — 2004 - 2005

                            </span></li>
                        </ul>
                    </div>
                </div>
                
                <div class="copyright-footer">
                    <span class="copyright-left">
                    Copyright 2021 – Virtual Employee. All Rights Reserved</span>
                    <span class="copyright-right">5</span>
                </div>
                </div>
            </div>
             {/* Page 5 end  */}
        </div>
    )
}

export default DeveloperResume;