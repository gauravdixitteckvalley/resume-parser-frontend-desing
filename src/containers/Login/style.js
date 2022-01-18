import styled from "styled-components";


export default styled.div`
/* ================================ card  ===================================*/

.card {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.3125rem; }
    .card > hr {
      margin-right: 0;
      margin-left: 0; }
    .card > .list-group {
      border-top: inherit;
      border-bottom: inherit; }
      .card > .list-group:first-child {
        border-top-width: 0;
        border-top-left-radius: calc(0.25rem - 1px);
        border-top-right-radius: calc(0.25rem - 1px); }
      .card > .list-group:last-child {
        border-bottom-width: 0;
        border-bottom-right-radius: calc(0.25rem - 1px);
        border-bottom-left-radius: calc(0.25rem - 1px); }
    .card > .card-header + .list-group,
    .card > .list-group + .card-footer {
      border-top: 0; }
  
  .card-body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1rem 1rem; }
  
  .card-title {
    margin-bottom: 0.5rem; }
  
  .card-subtitle {
    margin-top: -0.25rem;
    margin-bottom: 0; }
  
  .card-text:last-child {
    margin-bottom: 0; }
  
  .card-link + .card-link {
    margin-left: 1rem; }
  
  .card-header {
    padding: 0.5rem 1rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125); }
    .card-header:first-child {
      border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }
  
  .card-footer {
    padding: 0.5rem 1rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125); }
    .card-footer:last-child {
      border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }
  
  .card-header-tabs {
    margin-right: -0.5rem;
    margin-bottom: -0.5rem;
    margin-left: -0.5rem;
    border-bottom: 0; }
  
  .card-header-pills {
    margin-right: -0.5rem;
    margin-left: -0.5rem; }
  
  .card-img-overlay {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
    border-radius: calc(0.25rem - 1px); }
  
  .card-img,
  .card-img-top,
  .card-img-bottom {
    width: 100%; }
  
  .card-img,
  .card-img-top {
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px); }
  
  .card-img,
  .card-img-bottom {
    border-bottom-right-radius: calc(0.25rem - 1px);
    border-bottom-left-radius: calc(0.25rem - 1px); }
  
  .card-group > .card {
    margin-bottom: 0.75rem; }
  
  @media (min-width: 576px) {
    .card-group {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap; }
      .card-group > .card {
        -webkit-box-flex: 1;
        -ms-flex: 1 0 0%;
        flex: 1 0 0%;
        margin-bottom: 0; }
        .card-group > .card + .card {
          margin-left: 0;
          border-left: 0; }
        .card-group > .card:not(:last-child) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0; }
          .card-group > .card:not(:last-child) .card-img-top,
          .card-group > .card:not(:last-child) .card-header {
            border-top-right-radius: 0; }
          .card-group > .card:not(:last-child) .card-img-bottom,
          .card-group > .card:not(:last-child) .card-footer {
            border-bottom-right-radius: 0; }
        .card-group > .card:not(:first-child) {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0; }
          .card-group > .card:not(:first-child) .card-img-top,
          .card-group > .card:not(:first-child) .card-header {
            border-top-left-radius: 0; }
          .card-group > .card:not(:first-child) .card-img-bottom,
          .card-group > .card:not(:first-child) .card-footer {
            border-bottom-left-radius: 0; } }
  
.card {
    border: 0;
    background: #fff; }
    .card .card-body {
      padding: 2.5rem 2.5rem; }
      .card .card-body + .card-body {
        padding-top: 1rem; }
    .card .card-title {
      color: #343a40;
      margin-bottom: 0.75rem;
      text-transform: capitalize;
      font-family: "ubuntu-medium", sans-serif;
      font-size: 1.125rem; }
    .card .card-subtitle {
      font-family: "ubuntu-regular", sans-serif;
      margin-top: 0.625rem;
      margin-bottom: 0.625rem; }
    .card .card-description {
      color: #76838f;
      margin-bottom: 1.5rem;
      font-family: "ubuntu-regular", sans-serif; }
    .card.card-outline-success {
      border: 1px solid theme-color("success"); }
    .card.card-outline-primary {
      border: 1px solid theme-color("primary"); }
    .card.card-outline-warning {
      border: 1px solid theme-color("warning"); }
    .card.card-outline-danger {
      border: 1px solid theme-color("danger"); }
    .card.card-rounded {
      border-radius: 5px; }
    .card.card-faded {
      background: #b5b0b2;
      border-color: #b5b0b2; }
    .card.card-circle-progress {
      color: #ffffff;
      text-align: center; }
    .card.card-img-holder {
      position: relative; }
      .card.card-img-holder .card-img-absolute {
        position: absolute;
        top: 0;
        right: 0;
        height: 100%; }
    .card.bg-blue-gradient {
      background: -webkit-gradient(linear, left top, right top, from(#065efd), color-stop(#3169fd), to(#6f79fc));
      background: linear-gradient(to right, #065efd, #3169fd, #6f79fc);
      color: #fff; }
    .card.bg-orange-gradient {
      background: -webkit-gradient(linear, left top, right top, from(#ff7f2e), to(#fe7452));
      background: linear-gradient(to right, #ff7f2e, #fe7452);
      color: #fff; }
    .card.bg-green-gradient {
      background: -webkit-gradient(linear, left top, right top, from(#24e8a6), to(#09cdd1));
      background: linear-gradient(to right, #24e8a6, #09cdd1);
      color: #fff; }
    .card.card-no-shadow {
      -webkit-box-shadow: none;
      box-shadow: none; }
  
  @media (min-width: 576px) {
    .card-columns {
      -webkit-column-count: 3;
      -moz-column-count: 3;
      column-count: 3;
      -webkit-column-gap: 1.25rem;
      -moz-column-gap: 1.25rem;
      column-gap: 1.25rem;
      orphans: 1;
      widows: 1; }
      .card-columns .card {
        display: inline-block;
        width: 100%;
        margin-bottom: 0.75rem; } }
  
  .card-inverse-primary {
    background: rgba(182, 109, 255, 0.2);
    border: 1px solid theme-color-level(#b66dff, 1);
    color: theme-color-level(#b66dff, 3); }
  
  .card-inverse-secondary {
    background: rgba(195, 189, 189, 0.2);
    border: 1px solid theme-color-level(#c3bdbd, 1);
    color: theme-color-level(#c3bdbd, 3); }
  
  .card-inverse-success {
    background: rgba(27, 207, 180, 0.2);
    border: 1px solid theme-color-level(#1bcfb4, 1);
    color: theme-color-level(#1bcfb4, 3); }
  
  .card-inverse-info {
    background: rgba(25, 138, 227, 0.2);
    border: 1px solid theme-color-level(#198ae3, 1);
    color: theme-color-level(#198ae3, 3); }
  
  .card-inverse-warning {
    background: rgba(254, 215, 19, 0.2);
    border: 1px solid theme-color-level(#fed713, 1);
    color: theme-color-level(#fed713, 3); }
  
  .card-inverse-danger {
    background: rgba(254, 124, 150, 0.2);
    border: 1px solid theme-color-level(#fe7c96, 1);
    color: theme-color-level(#fe7c96, 3); }
  
  .card-inverse-light {
    background: rgba(248, 249, 250, 0.2);
    border: 1px solid theme-color-level(#f8f9fa, 1);
    color: theme-color-level(#f8f9fa, 3); }
  
  .card-inverse-dark {
    background: rgba(62, 75, 91, 0.2);
    border: 1px solid theme-color-level(#3e4b5b, 1);
    color: theme-color-level(#3e4b5b, 3); }
    /* ================================ card end ===================================*/
.login-cont {
    background: #f2edf3;
    height: 100vh;
  }  

  .container-scroller {
    overflow: hidden; }

    .main-panel {
        -webkit-transition: width 0.25s ease, margin 0.25s ease;
        transition: width 0.25s ease, margin 0.25s ease;
        width: calc(100% - 260px);
        min-height: calc(100vh - 70px);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column; }
        @media (max-width: 991px) {
          .main-panel {
            margin-left: 0;
            width: 100%; } }

.content-wrapper {
    background: #f2edf3;
    padding: 2.75rem 2.25rem;
    width: 100%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1; }
    .mb-4 {
        margin-bottom: 1.5rem !important; }
    .page-header {
        margin: 0 0 1.5rem 0; }
.login-img {
    max-width: 206px;
    margin: 0 auto;
    }



img, svg {
    vertical-align: middle;
}
.stretch-card {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    -webkit-box-pack: stretch;
    -ms-flex-pack: stretch;
    justify-content: stretch; }
    .stretch-card > .card {
      width: 100%;
      min-width: 100%; }

.my-form,.login-panel {
margin: 0 auto;
}
.grid-margin, .purchase-popup {
    margin-bottom: 2.5rem; }
    
    /* ================================== form elements  ============================ */
    .form-control {
        display: block;
        width: 100%;
        padding: 0.94rem 1.375rem;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1;
        color: #212529;
        background-color: color(white);
        background-clip: padding-box;
        border: 1px solid #ced4da;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 2px;
        -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out; }
        @media (prefers-reduced-motion: reduce) {
          .form-control {
            -webkit-transition: none;
            transition: none; } }
        .form-control[type="file"] {
          overflow: hidden; }
          .form-control[type="file"]:not(:disabled):not([readonly]) {
            cursor: pointer; }
        .form-control:focus {
          color: #212529;
          background-color: #fff;
          border-color: #86b7fe;
          outline: 0;
          -webkit-box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }
        .form-control::-webkit-date-and-time-value {
          height: 1em; }
        .form-control::-webkit-input-placeholder {
          color: #c9c8c8;
          opacity: 1; }
        .form-control::-moz-placeholder {
          color: #c9c8c8;
          opacity: 1; }
        .form-control:-ms-input-placeholder {
          color: #c9c8c8;
          opacity: 1; }
        .form-control::-ms-input-placeholder {
          color: #c9c8c8;
          opacity: 1; }
        .form-control::placeholder {
          color: #c9c8c8;
          opacity: 1; }
        .form-control:disabled, .form-control[readonly] {
          background-color: #e9ecef;
          opacity: 1; }
        .form-control::file-selector-button {
          padding: 0.94rem 1.375rem;
          margin: -0.94rem -1.375rem;
          -webkit-margin-end: 1.375rem;
          margin-inline-end: 1.375rem;
          color: #212529;
          background-color: #e9ecef;
          pointer-events: none;
          border-color: inherit;
          border-style: solid;
          border-width: 0;
          border-inline-end-width: 1px;
          border-radius: 0;
          -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out; }
          @media (prefers-reduced-motion: reduce) {
            .form-control::file-selector-button {
              -webkit-transition: none;
              transition: none; } }
        .form-control:hover:not(:disabled):not([readonly])::file-selector-button {
          background-color: #dde0e3; }
        .form-control::-webkit-file-upload-button {
          padding: 0.94rem 1.375rem;
          margin: -0.94rem -1.375rem;
          -webkit-margin-end: 1.375rem;
          margin-inline-end: 1.375rem;
          color: #212529;
          background-color: #e9ecef;
          pointer-events: none;
          border-color: inherit;
          border-style: solid;
          border-width: 0;
          border-inline-end-width: 1px;
          border-radius: 0;
          -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out; }
          @media (prefers-reduced-motion: reduce) {
            .form-control::-webkit-file-upload-button {
              -webkit-transition: none;
              transition: none; } }
        .form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {
          background-color: #dde0e3; }
      
      .form-control-plaintext {
        display: block;
        width: 100%;
        padding: 0.94rem 0;
        margin-bottom: 0;
        line-height: 1;
        color: #212529;
        background-color: transparent;
        border: solid transparent;
        border-width: 1px 0; }
        .form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {
          padding-right: 0;
          padding-left: 0; }
      
      .form-control-sm {
        min-height: 2.575rem;
        padding: 0.5rem 0.81rem;
        font-size: 0.875rem;
        border-radius: 0.2rem; }
        .form-control-sm::file-selector-button {
          padding: 0.5rem 0.81rem;
          margin: -0.5rem -0.81rem;
          -webkit-margin-end: 0.81rem;
          margin-inline-end: 0.81rem; }
        .form-control-sm::-webkit-file-upload-button {
          padding: 0.5rem 0.81rem;
          margin: -0.5rem -0.81rem;
          -webkit-margin-end: 0.81rem;
          margin-inline-end: 0.81rem; }
      
      .form-control-lg {
        min-height: 3.175rem;
        padding: 0.94rem 1.94rem;
        font-size: 1.25rem;
        border-radius: 0.3rem; }
        .form-control-lg::file-selector-button {
          padding: 0.94rem 1.94rem;
          margin: -0.94rem -1.94rem;
          -webkit-margin-end: 1.94rem;
          margin-inline-end: 1.94rem; }
        .form-control-lg::-webkit-file-upload-button {
          padding: 0.94rem 1.94rem;
          margin: -0.94rem -1.94rem;
          -webkit-margin-end: 1.94rem;
          margin-inline-end: 1.94rem; }
      
      textarea.form-control {
        min-height: 2.875rem; }
      
      textarea.form-control-sm {
        min-height: 2.575rem; }
      
      textarea.form-control-lg {
        min-height: 3.175rem; }
      
      .form-control-color {
        width: 3rem;
        height: auto;
        padding: 0.94rem; }
        .form-control-color:not(:disabled):not([readonly]) {
          cursor: pointer; }
        .form-control-color::-moz-color-swatch {
          height: 1em;
          border-radius: 2px; }
        .form-control-color::-webkit-color-swatch {
          height: 1em;
          border-radius: 2px; }
    
    
          .form-control,
          .form-control:focus {
            -webkit-box-shadow: none;
            -moz-box-shadow: none; }
          
          .form-control {
            -webkit-box-shadow: none;
            box-shadow: none; }
          
          .form-control:focus {
            outline: 0;
            -webkit-box-shadow: none;
            box-shadow: none; }
    
    
            
    .form-control,
    .form-control:focus {
      -webkit-box-shadow: none;
      -moz-box-shadow: none; }
    
    .form-control {
      -webkit-box-shadow: none;
      box-shadow: none; }
    
    .form-control:focus {
      outline: 0;
      -webkit-box-shadow: none;
      box-shadow: none; }
    
    
      .form-control {
        -webkit-box-shadow: none;
        box-shadow: none; }
      
      .form-control:focus {
        outline: 0;
        -webkit-box-shadow: none;
        box-shadow: none; }
      
      a,
      div, h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5,
      p,
      span {
        text-shadow: none; }
      
      [type=button]:focus,
      a:active,
      a:focus,
      a:visited,
      button::-moz-focus-inner,
      input[type=reset]::-moz-focus-inner,
      input[type=button]::-moz-focus-inner,
      input[type=submit]::-moz-focus-inner,
      input[type=file] > input[type=button]::-moz-focus-inner,
      select::-moz-focus-inner {
        outline: 0; }
      
      input,
      .form-control:focus,
      input:focus,
      select:focus,
      textarea:focus,
      button:focus {
        outline: none;
        outline-width: 0;
        outline-color: transparent;
        -webkit-box-shadow: none;
        box-shadow: none;
        outline-style: none; }
      
      textarea {
        resize: none;
        overflow-x: hidden; }
      
      .btn,
      .btn-group.open .dropdown-toggle,
      .btn:active,
      .btn:focus,
      .btn:hover,
      .btn:visited,
      a,
      a:active,
      a:checked,
      a:focus,
      a:hover,
      a:visited,
      body,
      button,
      button:active,
      button:hover,
      button:visited,
      div,
      input,
      input:active,
      input:focus,
      input:hover,
      input:visited,
      select,
      select:active,
      select:focus,
      select:visited,
      textarea,
      textarea:active,
      textarea:focus,
      textarea:hover,
      textarea:visited {
        -webkit-box-shadow: none;
        box-shadow: none; }
      
    
    
      /* Forms */
    .form-group {
        margin-bottom: 1.5rem; }
      
      .input-group-append,
      .input-group-prepend {
        color: #c9c8c8;
        width: auto;
        border: none; }
        .input-group-append .input-group-text,
        .input-group-prepend .input-group-text {
          border-color: #ebedf2;
          padding: 0.94rem 0.75rem;
          color: #c9c8c8; }
      
      .form-control {
        border: 1px solid #ebedf2;
        font-family: "ubuntu-regular", sans-serif;
        font-size: 0.8125rem; }
        .form-control:focus {
          background-color: #ffffff;
          color: #000000;
          outline: none; }
      
      select.form-control {
        padding: .4375rem .75rem;
        border: 0;
        outline: 1px solid #ebedf2;
        color: #c9c8c8; }
        select.form-control:focus {
          outline: 1px solid #ebedf2; }
        select.form-control.border-primary {
          outline: 1px solid #b66dff; }
          select.form-control.border-primary:focus {
            outline: 1px solid #b66dff; }
        select.form-control.border-secondary, select.form-control.loader-demo-box {
          outline: 1px solid #c3bdbd; }
          select.form-control.border-secondary:focus, select.form-control.loader-demo-box:focus {
            outline: 1px solid #c3bdbd; }
        select.form-control.border-success {
          outline: 1px solid #1bcfb4; }
          select.form-control.border-success:focus {
            outline: 1px solid #1bcfb4; }
        select.form-control.border-info {
          outline: 1px solid #198ae3; }
          select.form-control.border-info:focus {
            outline: 1px solid #198ae3; }
        select.form-control.border-warning {
          outline: 1px solid #fed713; }
          select.form-control.border-warning:focus {
            outline: 1px solid #fed713; }
        select.form-control.border-danger {
          outline: 1px solid #fe7c96; }
          select.form-control.border-danger:focus {
            outline: 1px solid #fe7c96; }
        select.form-control.border-light {
          outline: 1px solid #f8f9fa; }
          select.form-control.border-light:focus {
            outline: 1px solid #f8f9fa; }
        select.form-control.border-dark {
          outline: 1px solid #3e4b5b; }
          select.form-control.border-dark:focus {
            outline: 1px solid #3e4b5b; }
      
      .form-group label {
        font-size: 0.875rem;
        line-height: 1;
        vertical-align: top;
        margin-bottom: .5rem; }
      
      .form-group.has-danger .form-control {
        border-color: #fe7c96; }
      
      .form-group .file-upload-default {
        visibility: hidden;
        position: absolute; }
      
      .form-group .file-upload-info {
        background: transparent; }

        /* gradient buttons */

        
.btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1;
    color: #343a40;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.875rem 2.5rem;
    font-size: 0.875rem;
    border-radius: 0.1875rem;
    -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out; }
    @media (prefers-reduced-motion: reduce) {
      .btn {
        -webkit-transition: none;
        transition: none; } }
    .btn:hover {
      color: #343a40; }
    .btn-check:focus + .btn, .btn:focus {
      outline: 0;
      -webkit-box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25); }
    .btn:disabled, .btn.disabled,
    fieldset:disabled .btn {
      pointer-events: none;
      opacity: 0.65; }

       
.btn-gradient-primary {
  background: -webkit-gradient(linear, left top, right top, from(#da8cff), to(#9a55ff));
  background: linear-gradient(to right, #da8cff, #9a55ff);
  border: 0;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease; }
  .btn-gradient-primary:not([disabled]):not(.disabled):active, .btn-gradient-primary:not([disabled]):not(.disabled).active,
  .show > .btn-gradient-primary.dropdown-toggle {
    background: -webkit-gradient(linear, left top, right top, from(#da8cff), to(#9a55ff));
    background: linear-gradient(to right, #da8cff, #9a55ff); }
  .btn-gradient-primary:hover {
    opacity: .8; }
  .btn-gradient-primary:not(.btn-gradient-light) {
    color: #ffffff; }
    .btn-gradient-primary:not(.btn-gradient-light):hover, .btn-gradient-primary:not(.btn-gradient-light):focus, .btn-gradient-primary:not(.btn-gradient-light):active {
      color: #ffffff; }

`;