import React from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register'
import Aux  from '../../hoc/Aux';

const auth = ()=>(
    <Aux>
        <Login/>
        <Register/>
    </Aux>
    
)
export default auth;