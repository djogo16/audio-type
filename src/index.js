import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import Reducer from '../src/Reducers/Auth'
//import registerServiceWorker from './registerServiceWorker';

const store = createStore(Reducer, applyMiddleware(thunk))
const app = (
    <Provider store = {store}>
        <App/>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
//registerServiceWorker();
