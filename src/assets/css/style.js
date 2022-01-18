import styled from "styled-components";


export default styled.div`
    /*
    * Off Canvas sidebar at medium breakpoint
    * --------------------------------------------------
    */
    @media screen and (max-width: 992px) {

        .row-offcanvas {
            position: relative;
            -webkit-transition: all 0.25s ease-out;
            -moz-transition: all 0.25s ease-out;
            transition: all 0.25s ease-out;
        }

        .row-offcanvas-left
            .sidebar-offcanvas {
                left: -33%;
        }

        .row-offcanvas-left.active {
            left: 33%;
            margin-left: -6px;
        }

        .sidebar-offcanvas {
            position: absolute;
            top: 0;
            width: 33%;
            height: 100%;
        }
    }

    /*
    * Off Canvas wider at sm breakpoint
    * --------------------------------------------------
    */
    @media screen and (max-width: 34em) {
        .row-offcanvas-left
            .sidebar-offcanvas {
            left: -45%;
        }

        .row-offcanvas-left.active {
            left: 45%;
            margin-left: -6px;
        }
    
        .sidebar-offcanvas {
            width: 45%;
        }
    }

    .required:after {
        content:"*";
        color:red;
      }
`;