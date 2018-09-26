import React from 'react';
import Classes from './Sliders.css'
import Aux from '../../../hoc/Aux'
const speechRateSlider = (props) =>(
    <div className = {Classes.SliderContainer}>
        <label>Speech Rate</label>
        <input className = {Classes.Slider} value = {props.speechRate} onChange ={props.changed} type="range" id="start" name="speechRate" min="0.5" max="2" step="0.1"/>
    </div>

);
export default speechRateSlider;
