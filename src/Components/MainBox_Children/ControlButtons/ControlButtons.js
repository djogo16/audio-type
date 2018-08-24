import React from 'react';
import RepeatButton from './RepeatButton/RepeatButton.js';
import SoundButton from './SoundButton/SoundButton.js';
import SettingsButton from './SettingsButton/SettingsButton.js';
import Classes from './ControlButtons.css';


const controlButtons = (props) =>(
        <div className ={Classes.ControlButtons}>
            <RepeatButton/>
            <SoundButton/>
            <SettingsButton/>
        </div>

);
export default controlButtons;