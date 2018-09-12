import React, {Component} from 'react';
import Sound from 'react-sound';
import URL from '../../assets/Audios/3081-166546-0047.flac';
import Aux from '../../hoc/Aux';
import ControlButtons from '../../Components/MainBox_Children/ControlButtons/ControlButtons';
import DropDownMenu from '../../Components/MainBox_Children/DropDownMenu/DropDownMenu';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Modal from '../../Components/Modal/Modal';
import SearchResult from '../../Components/SearchResult/SearchResult';
import TextField from '../../Containers/MainBox/TextFied/TextField';
import axios from 'axios';
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
            audioUrl: '',
            audioUrls: [],
            urlIndex: 0,
            texts: [],
            isSearchResultVisible:false,
            bookTitle: "",
            bookChapters:"",
            searchInputFieldValue : "",
            audioLength : "10 seconds" //props to use in SettingsMenu.js
            //showAudioLengthMenu: false, //props to use in SettingsMenu.js
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
        axios.get("http://127.0.0.1:8001/audio/book?title=" + this.state.searchInputFieldValue.replace(/ /g, "+") + "&length=" + this.state.audioLength.split(" ")[0])
         .then(res=>{
             this.setState({searchResult:res.data['0'],bookTitle:res.data['0']['title'],bookChapters:res.data['0']['chapters']})
            //console.log(this.state.searchResult)
            //console.log(res.data)
            //console.log(res.data['0']['title'])
            console.log(this.state.isPlayActive)
            console.log(this.state.url);
         })
    }
    SearchInputFieldChangeHandler = (event) =>{
        //this.setState((prevState,newsSate)=>{searchInputFieldValue: document.getElementById("searchBook").value})
        this.setState({searchInputFieldValue:event.target.value})
        console.log(this.state.searchInputFieldValue)
    }
    ChapterClickedHandler = (event)=>{
        this.setState({isSearchResultVisible:false,isPlayActive:true})
        axios.get("http://127.0.0.1:8001/audio/chapter?chapter_id=" + event.target.id)
        .then(res =>{
            for (let i in res.data){
                this.setState(previousState =>(
                    {audioUrls:previousState.audioUrls.concat(res.data[i]["audio"]),
                    texts: previousState.texts.concat(res.data[i]["text"])
                }))
                //console.log(this.state.texts)
                //console.log((res.data[i]))
            }
        })
    }
    

    PlayClickedHandler = ()=>{

        this.state.isPlayActive? this.setState({isPlayActive:false}) :this.setState({isPlayActive:true});
        this.state.isPauseActive? this.setState({isPauseActive:false}):this.setState({isPauseActive:true});
    }
    PauseClickedHandler = ()=>{

        this.state.isPauseActive? this.setState({isPauseActive:false}) :this.setState({isPauseActive:true})
        this.state.isPlayActive? this.setState({isPlayActive:false}):this.setState({isPlayActive:true})
    }
    PreviousClickedHandler = ()=>{
        this.state.urlIndex > 0 ? this.setState(previousState=>({urlIndex:previousState.urlIndex - 1})) :null
        
        console.log(this.state.urlIndex)
    }
    NextClickedHandler = ()=>{
        this.state.urlIndex <this.state.audioUrls.length ? this.setState(previousState=>({urlIndex:previousState.urlIndex + 1})) :null
        console.log(this.state.urlIndex)
        console.log(this.state.audioUrls.length)
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
    SpeechRateChangedHandler = (event) =>{
        this.setState({ speechRate: event.target.value })
    }
    VolumeChangedHandler = (event) =>{
        this.setState({ volume:event.target.value })
    }
    OnAudioFinished = ()=>{
        this.setState({isPlayActive:false})
    }
    AudioLengthChangedHandler = (event)=>{
        this.setState({audioLength:event.target.innerHTML})
        //this.setState({showAudioLengthMenu:false})
    }
    

    render(){
        //"/home/fmk/Downloads/LibriSpeech/dev-clean/3081/166546/3081-166546-0010.flac"
        console.log(this.state.audioUrls[this.state.urlIndex])
        return(
            <Aux>
                {/* <h3   onClick  = {this.getRandomAudioURL} style = {{color: "IndianRed"}}>Click Here to Generate Random Audio</h3> */}
                <Modal show = {this.state.isSearchResultVisible}>
                {this.state.isSearchResultVisible ?
                 <SearchResult book = {this.state.bookTitle} chapters = {this.state.bookChapters} clicked = {this.ChapterClickedHandler}/> : null} 
                </Modal>
                <SearchBar onSubmit = {this.SearchAudioHandler} onChange ={this.SearchInputFieldChangeHandler} randomButtonCliked  = {this.getRandomAudioURL} book = {this.state.bookTitle} chapters = {this.state.bookChapters}/>
                {this.state.isPlayActive?
                <Sound url = {this.state.audioUrls[this.state.urlIndex]} playStatus = {Sound.status.PLAYING} onFinishedPlaying  = {this.OnAudioFinished} volume = {parseInt(this.state.volume)} playbackRate = {parseInt(this.state.speechRate)}/>:
                <Sound url = {this.state.audioUrls[this.state.urlIndex]} playStatus = {Sound.status.PAUSED} onFinishedPlaying  = {this.OnAudioFinished} volume = {parseInt(this.state.volume)} playbackRate = {parseInt(this.state.speechRate)}/>}
                <ControlButtons
                    playClicked = {this.PlayClickedHandler}
                    pauseClicked = {this.PauseClickedHandler}
                    isPlayActive = {this.state.isPlayActive}
                    isPauseActive = {this.state.isPauseActive}
                    volumeClicked = {this.VolumeClickedHandler}
                    settingsClicked = {this.SettingsClickedHandler}
                    previousClicked = {this.PreviousClickedHandler}
                    nextClicked = {this.NextClickedHandler}
                />
                <DropDownMenu 
                    isSettingsMenuActive = {this.state.isSettingsMenuActive} 
                    isVolumeMenuActive = {this.state.isVolumeMenuActive}
                    SpeechRateChangedHandler = {this.SpeechRateChangedHandler}                
                    VolumeChangedHandler = {this.VolumeChangedHandler}
                    volume = {this.state.volume}
                    speechRate = {this.state.speechRate}
                    audioLength = {this.state.audioLength}
                    AudioLengthChangedHandler = {this.AudioLengthChangedHandler}
                    
                    
                />
                <TextField audio = {this.state.audioUrls[this.state.urlIndex]} />

                
                
            </Aux>
            
        );
    }
}
export default Audio;