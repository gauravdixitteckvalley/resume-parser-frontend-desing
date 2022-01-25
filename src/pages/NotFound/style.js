
import styled from "styled-components";


export default styled.div`
    .mainbox {
        background-color: #95c2de;
        margin: auto;
        height: 92vh;
        width: auto;
        position: relative;
    }
  
    .err {
        color: #ffffff;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 11rem;
        position:absolute;
        left: 20%;
        top: 8%;
    }
  
    .far {
        position: absolute;
        font-size: 8.5rem;
        left: 42%;
        top: 15%;
        color: #ffffff;
    }
  
   .err2 {
        color: #ffffff;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 11rem;
        position:absolute;
        left: 68%;
        top: 8%;
    }
  
    .msg {
        text-align: center;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 1.6rem;
        position:absolute;
        left: 16%;
        top: 45%;
        width: 75%;
    }
  
    a {
        text-decoration: none;
        color: white;
    }
  
    a:hover {
        text-decoration: underline;
    }
`;