import React from 'react';
import Classes from './PreviousButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {previous2} from 'react-icons-kit/icomoon/previous2'


const previousButton = (props)=>(
    <Aux>
        <button  className={Classes.PreviousButton} onClick = {props.onClick}><Icon icon = {previous2}/></button>

    
    </Aux>
);
export default previousButton;