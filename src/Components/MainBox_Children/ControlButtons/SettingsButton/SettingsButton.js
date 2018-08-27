import React from 'react';
import Classes from './SettingsButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {settings} from 'react-icons-kit/ionicons/settings';
import "../../../../index"

const settingsButton = (props)=>(
    <Aux>
        <button  className={Classes.SettingsButton} onClick = {props.onClick}>
        <Icon icon = {settings}/></button>

    
    </Aux>
);
export default settingsButton;