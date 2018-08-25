import React from 'react';
import Classes from './NextButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {next2} from 'react-icons-kit/icomoon/next2'


const nextButton = ()=>(
    <Aux>
        <button  className={Classes.NextButton} onClick = {() => {


        }}><Icon icon = {next2}/></button>

    
    </Aux>
);
export default nextButton;