import React from 'react';
import { Icon } from 'react-icons-kit'
import {menu} from 'react-icons-kit/icomoon/menu';
import Aux from '../../../hoc/Aux'
import classes from './ToggleButton.css'
const toggleButton = (props)=>(
    <Aux>
        <button className = {classes.ToggleButton} onClick = {props.clicked}><Icon icon={menu} size = {'100%'} /></button>
    </Aux>
);
export default toggleButton;