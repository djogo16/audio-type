import React, {Component} from 'react'
import Classes from './SettingsMenu.css'
import Aux from '../../../../hoc/Aux'
import Switch from "react-switch"
import BackDrop from "../../../BackDrop/BackDrop"

class SettingsMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            toggleButtonValue: false,
            showRepeatMenu: false,
            showAudioLengthMenu: false,
            repeatValue : 'Once', 
            //audioLength : '10 seconds',
            
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
            <Aux>
                {/* <BackDrop show = {true}/> */}
                <div className = {Classes.SettingsMenu}>
                    {/*<span>
                        <p>Repeat Sentences</p>
                        <div className = {Classes.Menu}>
                            <div className={Classes.ArrowContainer} onClick ={this.RepeatSelectorClickedHandler}><p>{this.state.repeatValue}</p><i></i></div>
                            {this.state.showRepeatMenu ? <Aux>
                            <label onClick = {this.RepeatValueChangedHandler}>None</label>
                            <label onClick = {this.RepeatValueChangedHandler}>Once</label>
                            <label onClick = {this.RepeatValueChangedHandler}>Twice</label> </Aux>: null}
                        </div>
                        
                            </span> */}
                    <span>
                        <p>Speech Rate</p>
                        <div className = {Classes.Menu}>
                            <div className ={Classes.ArrowContainer} onClick = {this.AudioLengthSelectorClickedHandler}><p>{this.props.speechRate + "x"}</p><i></i></div>
                            {this.state.showAudioLengthMenu ? <Aux>
                            <label onClick = {this.props.speechRateHandler}>0.5x</label>
                            <label onClick = {this.props.speechRateHandler}>0.6x</label>
                            <label onClick = {this.props.speechRateHandler}>0.7x</label>
                            <label onClick = {this.props.speechRateHandler}>0.8x</label>
                            <label onClick = {this.props.speechRateHandler}>0.9x</label>
                            <label onClick = {this.props.speechRateHandler}>1x</label>
                            <label onClick = {this.props.speechRateHandler}>1.5x</label>
                            <label onClick = {this.props.speechRateHandler}>2x</label> </Aux>: null}
                        </div>
                    </span>
                    <span>
                        <p>Auto Play Next</p>
                        <Switch checked = {this.props.autoPlayChecked} onChange = {this.props.AutoPlayChangedHandler} checkedIcon={false} uncheckedIcon = {false} onColor = '#A52A2A' activeBoxShadow ='0 0 2px 3px #A52A2A'/>
                    </span>
                </div>
            </Aux>
        )
    
        
    }
}
export default SettingsMenu;
    