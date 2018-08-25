import React from 'react';
import Classes from './PauseButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {pause2} from 'react-icons-kit/icomoon/pause2'


const pauseButton = (props)=>(
    <Aux>
        <button  className={Classes.PauseButton} onClick = {props.onClick}
        ><Icon icon = {pause2}/></button>

    
    </Aux>
);
export default pauseButton;