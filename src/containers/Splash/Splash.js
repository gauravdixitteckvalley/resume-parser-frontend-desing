import React, { Fragment, useEffect} from 'react';

import BlockUI from "../../components/BlockUI";

const Splash = () => {

    useEffect(() => {
        setTimeout(() => {
            window.location.assign('/login');
        }, 3000);
    })

    return (
        <Fragment>
            <BlockUI />
            <div className=" container-scroller login-cont" style={{ 
                        backgroundImage:`url(${process.env.PUBLIC_URL+ "/splashVe.png"})`, 
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat' 
                    }}
                >
                <div id="inner" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    <img src="../../assets/img/logo.png" alt="logo" style={{verticalAlign: 'middle'}} />
                </div>
                <div style={{position: 'absolute', top: '95%', right: '0', transform: 'translate(-50%, -50%)'}}>
                    <p style={{fontSize: '1rem', fontWeight: 'bold'}}>Version: 1.0</p>
                </div>
            </div>
            
        </Fragment>
    )
}

export default Splash;