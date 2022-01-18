import React, { Fragment, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import LoginStyle from './style';
import {login} from '../../actions/Login'
import BlockUI from "../../components/BlockUI";

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
            
                <div className="background-design">
                <div style={{"margin-top": "10vh"}}>
                        <h1>VE Resumes</h1>
                    </div>
                    <div id="logreg-forms">
                        <form className="form-signin" onSubmit={(event) => handleSubmit(event)}>
                            {/* <h1 style={{"textAlign": "center"}}>VE Resumes</h1> */}
                            <h1 className="h3 mb-3 font-weight-normal" style={{"textAlign": "center"}}> Login</h1>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="Email address" 
                                    required={true}
                                    name="email"
                                    onChange={_handleChange}
                                />
                                <div className="errorMsg">{errors.email}</div>
                            </div>
                            <div className="form-group mt-2">
                                <input type="password" className="form-control" placeholder="Password" 
                                    required={true}
                                    name="password"
                                    onChange={_handleChange}
                                />
                                <div className="errorMsg">{errors.password}</div>
                            </div>
                            
                            <button className="btn btn-success btn-block center" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
            </LoginStyle>
        </Fragment>
    )
}

export default Login;