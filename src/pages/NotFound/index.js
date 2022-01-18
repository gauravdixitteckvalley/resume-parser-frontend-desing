import React, {useEffect} from "react";
import {Link} from 'react-router-dom';

import NotFoundStyle from './style';

const NotFound = (props) => {
    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/fontawesomekit.js";
        script.async = true;
      
        document.body.appendChild(script);
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="col main pt-5 mt-3">
            <NotFoundStyle>
                <div className="mainbox">
                    <div className="not-found">
                        <div className="err">4</div>
                        <i className="far fa-question-circle fa-spin"></i>
                        <div className="err2">4</div>
                        <div className="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?
                            <p>Let's go <Link to='/dashboard'>home</Link> and try from there.</p>
                        </div>
                    </div>
                </div>
            </NotFoundStyle>
        </div>
    )
}

export default NotFound;