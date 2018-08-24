import React from 'react';
import Classes from './RepeatButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {spinner11} from 'react-icons-kit/icomoon/spinner11'


const repeatButton = ()=>(
    <Aux>
        <button className={Classes.RepeatButton} onClick = {() => {console.log("clicked")


        }}><Icon icon = {spinner11}/></button>

    
    </Aux>
);
export default repeatButton;