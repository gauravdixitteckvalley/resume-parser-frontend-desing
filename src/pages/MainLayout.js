import React, {useEffect} from 'react';

import CommonStyle from '../assets/css/style.js';
import Header from './layouts/Header';
import Sidebar from './layouts/Sidebar/Sidebar';
import '../template.css';
import Footer from './layouts/Footer/Footer';

const MainLayout = (props) => {
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        const canvas = document.querySelector('[data-toggle=offcanvas]');
        const row = document.querySelector('.row-offcanvas');
        canvas.addEventListener('click', function(){
            row.classList.toggle('active');
        })
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return(
        <CommonStyle>
            <div class="container-scroller">
                <Header {...props.children.props}></Header>
                <div className="container-fluid page-body-wrapper" >{/* id="main" */}
                    <Sidebar {...props.children.props} ></Sidebar>
                    <div class="main-panel">
                        <div class="content-wrapper">
                            {props.children}
                        </div>
                        <Footer />
                    </div>
                    {/* <div className="row row-offcanvas row-offcanvas-left h-100 active">
                        <div className="col main pt-5 mt-3"> */}
                            {/** main content shows here */}
                            
                            {/* <Footer {...props.children.props}></Footer> */}
                        {/* </div>
                    </div> */}
                </div>
            </div>
        </CommonStyle>
    )
}

export default MainLayout;