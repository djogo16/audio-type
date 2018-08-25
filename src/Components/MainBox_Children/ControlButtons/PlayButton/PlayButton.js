import React from 'react';
import Classes from './PlayButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {play3} from 'react-icons-kit/icomoon/play3'


const playButton = (props)=>(
    <Aux>
        <button  className={Classes.PlayButton} onClick ={props.onClick}>
        <Icon icon = {play3}/></button>

    
    </Aux>
);
export default playButton;