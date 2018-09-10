import React, {Component} from 'react'
import Classes from './SettingsMenu.css'
import Aux from '../../../../hoc/Aux'
import Switch from "react-switch"

class SettingsMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            toggleButtonValue: false,
            showRepeatMenu: false,
            showAudioLengthMenu: false,
            repeatValue : 'Once', 
            //audioLength : '10 seconds',
            autoPlayChecked : false,
        }
    }
    RepeatSelectorClickedHandler = ()=>{
        this.setState(previousState => ({showRepeatMenu:!previousState.showRepeatMenu}))
        this.state.showAudioLengthMenu ?  this.setState({showAudioLengthMenu:false}) : null
    }
    AudioLengthSelectorClickedHandler = () =>{
        this.setState(previousState => ({showAudioLengthMenu:!previousState.showAudioLengthMenu}))
        this.state.showRepeatMenu ?  this.setState({showRepeatMenu:false}) : null
    }
    RepeatValueChangedHandler = (event)=>{
        this.setState({repeatValue:event.target.innerHTML})
        this.setState({showRepeatMenu:false})
    }
    /* AudioLengthChangedHandler = (event)=>{
        this.setState({audioLength:event.target.innerHTML})
        this.setState({showAudioLengthMenu:false})
    } */
    AutoPlayChangedHandler = () =>{
        this.setState(previousState => ({autoPlayChecked:!previousState.autoPlayChecked}))
    }
    render(){
        return(
                <div className = {Classes.SettingsMenu}>
                    <span>
                        <p>Repeat Sentences</p>
                        <div className = {Classes.Menu}>
                            <div className={Classes.ArrowContainer} onClick ={this.RepeatSelectorClickedHandler}><p>{this.state.repeatValue}</p><i></i></div>
                            {this.state.showRepeatMenu ? <Aux>
                            <label onClick = {this.RepeatValueChangedHandler}>None</label>
                            <label onClick = {this.RepeatValueChangedHandler}>Once</label>
                            <label onClick = {this.RepeatValueChangedHandler}>Twice</label> </Aux>: null}
                        </div>
                        
                    </span>
                    <span>
                        <p>Audio Length</p>
                        <div className = {Classes.Menu}>
                            <div className ={Classes.ArrowContainer} onClick = {this.AudioLengthSelectorClickedHandler}><p>{this.props.audioLength}</p><i></i></div>
                            {this.state.showAudioLengthMenu ? <Aux>
                            <label onClick = {this.props.AudioLengthChangedHandler}>10 seconds</label>
                            <label onClick = {this.props.AudioLengthChangedHandler}>20 seconds</label>
                            <label onClick = {this.props.AudioLengthChangedHandler}>30 seconds</label>
                            <label onClick = {this.props.AudioLengthChangedHandler}>40 seconds</label>
                            <label onClick = {this.props.AudioLengthChangedHandler}>50 seconds</label>
                            <label onClick = {this.props.AudioLengthChangedHandler}>60 seconds</label> </Aux>: null}
                        </div>
                    </span>
                    <span>
                        <p>Auto Play Next</p>
                        <Switch checked = {this.state.autoPlayChecked} onChange = {this.AutoPlayChangedHandler} checkedIcon={false} uncheckedIcon = {false} onColor = '#A52A2A' activeBoxShadow ='0 0 2px 3px #A52A2A'/>
                    </span>
                </div>
        )
    
        
    }
}
export default SettingsMenu;
    