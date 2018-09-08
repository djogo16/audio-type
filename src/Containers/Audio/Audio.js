import React, {Component} from 'react'
import Sound from 'react-sound';
import URL from '../../assets/Audios/3081-166546-0047.flac';
import Aux from '../../hoc/Aux'
import ControlButtons from '../../Components/MainBox_Children/ControlButtons/ControlButtons'
import DropDownMenu from '../../Components/MainBox_Children/DropDownMenu/DropDownMenu'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Modal from '../../Components/Modal/Modal'
import SearchResult from '../../Components/SearchResult/SearchResult'
import axios from 'axios'
class Audio extends Component{
    constructor(props){
        super(props)
        this.state = {
            isPlayActive : false,
            isPauseActive : true,
            isVolumeMenuActive: false,
            isSettingsMenuActive: false,
            isSpeechRateMenuActive : false,
            volume : 80,
            speechRate: 1,
            audioUrl: "",
            isSearchResultVisible:false,
            bookTitle: "",
            bookChapters:"",
            searchInputFieldValue : "",
        }
    }
    getRandomAudioURL = ()=> {
        axios.get("http://127.0.0.1:8001/audio/")
        .then(response =>{
            axios.get("http://127.0.0.1:8001/audio/"+Math.floor(Math.random() * response.data.length))
            .then(response =>{
                this.setState({audioUrl:response.data.audio})
                //console.log(this.state.url);
            });

        });
            
        
    }
    SearchAudioHandler = (event)=>{
        this.setState({isSearchResultVisible:true})
        event.preventDefault()
        axios.get("http://127.0.0.1:8000/audio/book?title=" + this.state.searchInputFieldValue.replace(/ /g, "+"))
         .then(res=>{
             this.setState({searchResult:res.data['0'],bookTitle:res.data['0']['title'],bookChapters:res.data['0']['chapters']})
            console.log(this.state.searchResult)
            console.log(res.data['0']['title'])
            //console.log(res.data['0']['chapters'])
         })
    }
    SearchInputFieldChangeHandler = (event) =>{
        //this.setState((prevState,newsSate)=>{searchInputFieldValue: document.getElementById("searchBook").value})
        this.setState({searchInputFieldValue:event.target.value})
        console.log(this.state.searchInputFieldValue)
    }
    

    PlayClickedHandler = ()=>{

        this.state.isPlayActive? this.setState({isPlayActive:false}) :this.setState({isPlayActive:true});
        this.state.isPauseActive? this.setState({isPauseActive:false}):this.setState({isPauseActive:true});
    }
    PauseClickedHandler = ()=>{

        this.state.isPauseActive? this.setState({isPauseActive:false}) :this.setState({isPauseActive:true})
        this.state.isPlayActive? this.setState({isPlayActive:false}):this.setState({isPlayActive:true})
    }
    /*RepeatClickedHandler = ()=>{

        this.state.isPauseActive? this.setState({isPauseActive:false}) :this.setState({isPauseActive:true})
        this.state.isPlayActive? this.setState({isPlayActive:false}):this.setState({isPlayActive:true})
    }*/
    VolumeClickedHandler = ()=>{
        this.setState({isSettingsMenuActive:false})
        this.state.isVolumeMenuActive? this.setState({isVolumeMenuActive:false}) :this.setState({isVolumeMenuActive:true})
    }
    SettingsClickedHandler = ()=>{

        this.setState({isVolumeMenuActive:false})
        this.state.isSettingsMenuActive? this.setState({isSettingsMenuActive:false}) :this.setState({isSettingsMenuActive:true})
    }
    SpeechRateChangedHandler = (e) =>{
        this.setState({ speechRate: e.target.value })
    }
    VolumeChangedHandler = (e) =>{
        this.setState({ volume:e.target.value })
    }

    render(){
        //"/home/fmk/Downloads/LibriSpeech/dev-clean/3081/166546/3081-166546-0010.flac"
        return(
            <Aux>
                {/* <h3   onClick  = {this.getRandomAudioURL} style = {{color: "IndianRed"}}>Click Here to Generate Random Audio</h3> */}
                <Modal show = {this.state.isSearchResultVisible}>
                {this.state.isSearchResultVisible ?
                 <SearchResult book = {this.state.bookTitle} chapters = {this.state.bookChapters}/> : null} 
                </Modal>
                <SearchBar onSubmit = {this.SearchAudioHandler} onChange ={this.SearchInputFieldChangeHandler} randomButtonCliked  = {this.getRandomAudioURL} book = {this.state.bookTitle} chapters = {this.state.bookChapters}/>
                {this.state.isPlayActive?
                <Sound url = {this.state.audioUrl} playStatus = {Sound.status.PLAYING} volume = {parseInt(this.state.volume)} playbackRate = {parseInt(this.state.speechRate)}/>:
                <Sound url = {this.state.audioUrl} playStatus = {Sound.status.PAUSED} volume = {parseInt(this.state.volume)} playbackRate = {parseInt(this.state.speechRate)}/>}
                <ControlButtons
                    playClicked = {this.PlayClickedHandler}
                    pauseClicked = {this.PauseClickedHandler}
                    isPlayActive = {this.state.isPlayActive}
                    isPauseActive = {this.state.isPauseActive}
                    volumeClicked = {this.VolumeClickedHandler}
                    settingsClicked = {this.SettingsClickedHandler}
                />
                <DropDownMenu 
                    isSettingsMenuActive = {this.state.isSettingsMenuActive} 
                    isVolumeMenuActive = {this.state.isVolumeMenuActive}
                    SpeechRateChangedHandler = {this.SpeechRateChangedHandler}                
                    VolumeChangedHandler = {this.VolumeChangedHandler}
                    volume = {this.state.volume}
                    speechRate = {this.state.speechRate}
                    
                />

                
                
            </Aux>
            
        );
    }
}
export default Audio;