import React , {Component} from 'react';
import Aux from '../../hoc/Aux.js';
//import ControlButtons from '../../../src/Components/MainBox_Children/ControlButtons/ControlButtons.js';
import TextField from './TextFied/TextField.js'
import Audio from '../Audio/Audio'
import VolumeSlider from '../../Components/MainBox_Children/Sliders/VolumeSlider'
class MainBox extends Component{
    render(){

        return (
            <Aux>
                <Audio/>
                <TextField/>
                
               
            </Aux>
        );
    }
}
export default MainBox; 