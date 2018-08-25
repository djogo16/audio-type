import React from 'react';
import Classes from './SettingsButton.css';
import Aux from '../../../../hoc/Aux.js';
import { Icon } from 'react-icons-kit';
import {play3} from 'react-icons-kit/icomoon/play3'

import "../../../../index"

const playButton = ()=>(
    <Aux>
        <button  className={Classes.SettingsButton} onClick = {() => {


        }}><Icon icon = {play3}/></button>

    
    </Aux>
);
export default playButton;