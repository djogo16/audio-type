import React from 'react';
import Classes from './SoundButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {volumeMedium} from 'react-icons-kit/icomoon/volumeMedium';

const soundButton = ()=>(
    <Aux>
        <button className={Classes.SoundButton} onClick = {() => {


        }}><Icon icon ={volumeMedium} /></button>

    
    </Aux>
);
export default soundButton;