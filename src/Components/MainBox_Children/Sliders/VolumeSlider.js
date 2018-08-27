import React from 'react';
import Classes from './Sliders.css'
import Aux from '../../../hoc/Aux'
const volumeSlider = (props) =>(
    <div className = {Classes.SliderContainer}>
        <label>Volume</label>
        <input className = {Classes.Slider}  type="range" value = {props.volume} onChange ={props.changed} id="start" name="volume" min="0" max="100" step="2"/>
    </div>

);
export default volumeSlider;
