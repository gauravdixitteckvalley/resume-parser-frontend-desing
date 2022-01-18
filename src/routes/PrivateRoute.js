import React from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import _ from 'lodash';

import {getLoggedInUserData} from '../utils/helper';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const user = getLoggedInUserData();
        return (!_.isEmpty(user)) ? (
            <Component {...props} />
        ) : (
            <Redirect to={{pathname: '/', state: { from: props.location }}} />
        )
  }}/>
);

export default withRouter(PrivateRoute);