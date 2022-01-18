import axios from 'axios';

import handleHttpError, { history, API_URL } from '../../utils/helper';

export const login = (postData = {}, props) => {
    return async dispatch => {
        dispatch({ type: 'LOGIN_REQUEST' });
        try {
            const response = await axios.post(`${API_URL}login`, postData);

            if (response.data.success) {
                const userData = (response.data.data.user)
                dispatch({ type : 'LOGIN_SUCCESS', payload : userData});
                localStorage.setItem('data', JSON.stringify(userData));
                localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken));
                if(userData.email === 'testing@gmail.com'){
                    //const { from } = props?.location?.state || { from: { pathname: '/dashboard' } }
                    const { from } = props?.location?.state || { from: { pathname: '/dashboard' } }
                    history.push(from);
                }else{
                    const { from } = props?.location?.state || { from: { pathname: '/resume' } }
                    history.push(from);
                }
                    
            }
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    }
}

/* action resetting logged user data */
export const resetLoggedUserData = (id) => {
    return async dispatch => {
        dispatch({ type: 'RESET_LOGGED_USER_DATA' });
    }
}
