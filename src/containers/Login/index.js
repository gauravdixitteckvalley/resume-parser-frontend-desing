import React, { Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import LoginStyle from './style';
import {login} from '../../actions/Login'
import BlockUI from "../../components/BlockUI";
import Footer from '../../pages/layouts/Footer/Footer';

const Login = (props) => {
    const [fields, setFields] = useState({});
    const [errors, setErrors] = useState({});
    const [location, setLocation] = useState({});

    /**fetched data from redux store */
    const loggedUser = useSelector(state => state.authenticatedUser);
    const dispatch = useDispatch();

    /**hook equivalent to componentdidmount lifecycle */
    useEffect(() => {
        setLocation({...props});
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    /* validate form */
    const _validateForm = () => {
        let formFields = fields;
        let errors = {};
        let formIsValid = true;

        if (!formFields["email"] || formFields["email"].trim() === '') {
            formIsValid = false;
            errors["email"] = "*Please enter your email";
        }

        if (!formFields["password"] || formFields["password"].trim() === '') {
            formIsValid = false;
            errors["password"] = "*Please enter your password";
        }

        setErrors(errors)
        return formIsValid;
    }

    /* handle input field changes */
    const _handleChange = (event) => {
        let field = fields;
        field[event.target.name] = event.target.value;
        setFields(field)
    }

    /* submit form */
    const handleSubmit = (event) => {
        event.preventDefault();
        if(_validateForm()) {
            const { email, password } = event.target;
            const userData = {
                email       : email.value,
                password    : password.value
            }
            
            dispatch(login(userData, location))
            setFields({})
        }
    }

    const { blocking } = loggedUser;
    
    return(
        <Fragment>
            <BlockUI blocking={blocking} />
            <LoginStyle>
                    <div className=" container-scroller login-cont">
                        <div className="main-panel login-panel">
                            <div className="content-wrapper">
                                <div className="page-header mb-4 login-img">
                                    <img src="../../assets/img/logo.png" alt="logo" />
                                </div>
                                <div className="row">
                                    <div className="col-md-6 grid-margin stretch-card my-form">
                                        <div className="card">
                                            <div className="card-body" id="logreg-forms">
                                            <h4 className="card-title text-center">Login</h4>
                                            <form className="form-signin forms-sample" onSubmit={(event) => handleSubmit(event)}>
                                                <div className="form-group">
                                                <label for="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" 
                                                    required={true}
                                                    name="email"
                                                    onChange={_handleChange}
                                                />
                                                <div className="errorMsg">{errors.email}</div>
                                                </div>
                                                <div className="form-group">
                                                <label for="exampleInputPassword1">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                                                    required={true}
                                                    name="password"
                                                    onChange={_handleChange}
                                                />
                                                <div className="errorMsg">{errors.password}</div>
                                                </div>
                                                <div className="text-center">
                                                <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                                                </div>
                                            </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />

                        </div>
                    </div>
                
            </LoginStyle>
        </Fragment>
    )
}

export default Login;