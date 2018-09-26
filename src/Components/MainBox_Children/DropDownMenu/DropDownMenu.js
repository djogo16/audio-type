import React from 'react';
import VolumeSlider from '../Sliders/VolumeSlider'
import SpeechRateSlider from '../Sliders/SpeechRateSlider'
import Classes from './DropDownMenu.css'
import SettingsMenu from '../DropDownMenu/SettingsMenu/SettingsMenu'
import BackDrop from "../../BackDrop/BackDrop"

const dropDownMenu = (props)=>{
    let menu = null
    {props.isVolumeMenuActive ? 
    menu = <div style={{width:"100%"}}>
            <BackDrop show ={true} clicked = {props.VolumeMenuBackDropClicked} transparent/>
            <div className ={Classes.DropDownMenu}>
                <VolumeSlider volume = {props.volume} changed = {props.VolumeChangedHandler}/> 
                <SpeechRateSlider speechRate = {props.speechRate} changed = {props.SpeechRateChangedHandler}/>
            </div>
            </div>
    : null}
    {props.isSettingsMenuActive ? 
        menu = <div className ={Classes.DropDownMenu}>
                    <BackDrop show ={true} clicked = {props.SettingsMenuBackDropClicked} transparent/>
                    <SettingsMenu 
                        speechRate = {props.speechRate} 
                        speechRateHandler = {props.SpeechRateChangedHandler} 
                        audioLength = {props.audioLength} 
                        AudioLengthChangedHandler = {props.AudioLengthChangedHandler}
                        autoPlayChecked = {props.autoPlayChecked}
                        AutoPlayChangedHandler = {props.AutoPlayChangedHandler}
                    />
                </div>
        : null}
    return(menu);
            
}
export default dropDownMenu;



