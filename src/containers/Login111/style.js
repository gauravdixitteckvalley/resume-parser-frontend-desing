import styled from "styled-components";


export default styled.div`
    .background-design {
        background-color: #C6C6C6;
        width: 100%;
        display: flex;
        align-items: center;
        min-height: 100vh;
        flex-direction:column;
    }
    #logreg-forms{
        width:512px;
        margin:10vh auto;
        background-color:#f3f3f3;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    }
    #logreg-forms form {
        width: 100%;
        max-width: 510px;
        padding: 25px;
        margin: auto;
    }
    #logreg-forms .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }
    #logreg-forms .form-control:focus { z-index: 2; }
    #logreg-forms .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    #logreg-forms .form-signin input[type="password"] {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .center {
        display: block;
        margin: 10px auto;
    }


    #logreg-forms button{ margin-top:10px; }

    /* Mobile */

    @media screen and (max-width:500px){
        #logreg-forms{
            width:300px;
        }
    }

    .errorMsg {
        color : red;
    }
`;