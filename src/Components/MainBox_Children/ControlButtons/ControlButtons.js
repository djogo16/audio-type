import React from 'react';
import RepeatButton from './RepeatButton/RepeatButton.js';
import SoundButton from './SoundButton/SoundButton.js';
import SettingsButton from './SettingsButton/SettingsButton.js';
import PlayButton from './PlayButton/PlayButton'
import PauseButton from './PauseButton/PauseButton'
import NextButton from './NextButton/NextButton'
import PreviousButton from './PreviousButton/PreviousButton'
import Classes from './ControlButtons.css';

const controlButtons = (props) =>(
        <div className ={Classes.ControlButtons}>
            {/* <RepeatButton/> */}
            <SoundButton onClick = {props.volumeClicked}/>
            <PreviousButton onClick = {props.previousClicked}/>
            {props.isPauseActive ?
            <PlayButton onClick = {props.playClicked}/> :
            <PauseButton onClick = {props.pauseClicked}/>}
            <NextButton onClick ={props.nextClicked}/>
            <SettingsButton onClick = {props.settingsClicked}/>
            
        </div>

);
export default controlButtons;