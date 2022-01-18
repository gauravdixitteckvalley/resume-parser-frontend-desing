import './App.css'
import { createStore ,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducers/rootReducer';
import MainRoute from './routes/MainRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import "mdi-icons/css/materialdesignicons.min.css";

function App() {
    const store = createStore(reducer, applyMiddleware(thunk));

    return (
        <Provider store={store}><MainRoute /> </Provider>
    );
}

export default App;