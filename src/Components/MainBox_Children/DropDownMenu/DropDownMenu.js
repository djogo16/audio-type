import React from 'react';
import VolumeSlider from '../Sliders/VolumeSlider'
import SpeechRateSlider from '../Sliders/SpeechRateSlider'
import Classes from './DropDownMenu.css'
import SettingsMenu from '../DropDownMenu/SettingsMenu/SettingsMenu'

const dropDownMenu = (props)=>{
    let menu = null
    {props.isVolumeMenuActive ? 
    menu = <div style={{width:"100%"}}>
            <div className ={Classes.DropDownMenu}rate>
                <VolumeSlider volume = {props.volume} changed = {props.VolumeChangedHandler}/> 
                <SpeechRateSlider speechRate = {props.speechRate} changed = {props.SpeechRateChangedHandler}/>
            </div>
            </div>
    : null}
    {props.isSettingsMenuActive ? 
        menu = <div className ={Classes.DropDownMenu}rate>
                    <SettingsMenu audioLength = {props.audioLength} AudioLengthChangedHandler = {props.AudioLengthChangedHandler}/>
                </div>
        : null}
    return(menu);
            
}
export default dropDownMenu;



