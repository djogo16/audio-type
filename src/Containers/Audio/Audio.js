import React, {Component} from 'react'
import Sound from 'react-sound';
import URL from '../../assets/Audios/candide_09_voltaire_64kb.mp3';
import Aux from '../../hoc/Aux'
import ControlButtons from '../../Components/MainBox_Children/ControlButtons/ControlButtons'
class Audio extends Component{
    constructor(props){
        super(props)
        this.state = {
            isPlayActive : false,
            isPauseActive : true,
            
        }
    }
    PlayClickedHandler = ()=>{

        this.state.isPlayActive? this.setState({isPlayActive:false}) :this.setState({isPlayActive:true});
        this.state.isPauseActive? this.setState({isPauseActive:false}):this.setState({isPauseActive:true});
    }
    PauseClickedHandler = ()=>{

        this.state.isPauseActive? this.setState({isPauseActive:false}) :this.setState({isPauseActive:true})
        this.state.isPlayActive? this.setState({isPlayActive:false}):this.setState({isPlayActive:true})
    }
    //PauseClickedHandler()
    //VolumeChangedHandler()
    render(){
        return(
            <Aux>
                <h2 onClick  = {this.PlayClickedHandler} style = {{color: "IndianRed"}}>Click here</h2>
                {this.state.isPlayActive?
                <Sound url = {URL} playStatus = {Sound.status.PLAYING} />:
                <Sound url = {URL} playStatus = {Sound.status.PAUSED} />}
                <ControlButtons
                    playClicked = {this.PlayClickedHandler}
                    pauseClicked = {this.PauseClickedHandler}
                    isPlayActive = {this.state.isPlayActive}
                    isPauseActive = {this.state.isPauseActive}
                />
            </Aux>
            
        );
    }
}
export default Audio;