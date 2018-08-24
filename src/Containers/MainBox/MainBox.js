import React , {Component} from 'react';
import Aux from '../../hoc/Aux.js';
import ControlButtons from '../../../src/Components/MainBox_Children/ControlButtons/ControlButtons.js';
import TextField from './TextFied/TextField.js'

class MainBox extends Component{
    render(){
        return (
            <Aux>
                <ControlButtons/>
                <TextField/>
            </Aux>
        );
    }
}
export default MainBox; 