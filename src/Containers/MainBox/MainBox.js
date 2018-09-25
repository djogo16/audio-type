import React , {Component} from 'react';
import Aux from '../../hoc/Aux.js';
//import ControlButtons from '../../../src/Components/MainBox_Children/ControlButtons/ControlButtons.js';
import TextField from './TextFied/TextField.js';
import Audio from '../Audio/Audio';
import Auth from '../Auth/Auth'

class MainBox extends Component{
    render(){

        return (
            <Aux>
                <Audio/>
                <Auth/>
                
               
            </Aux>
        );
    }
}
export default MainBox; 