import axios from 'axios';

import {API_URL} from '../utils/helper';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios.create({
    baseURL : API_URL,
    responseType: "json"
});