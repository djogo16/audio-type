import React, {Component} from 'react';
import Sound from 'react-sound';
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
            audioSegmentsStartTime : [],
            audioPosition: 0,
            isSearchResultVisible:false,
            bookTitle: "",
            bookChapters:"",
            bookFound: true,
            searchInputFieldValue : "",
            audioLength : "20 seconds", //props to use in SettingsMenu.js
            audioRepeatCount : 0
            
        }
    }
    GetRandomAudioURL = ()=> {
        this.PlayClickedHandler()
        axios.get("https://audiotypeapi.herokuapp.com/audio/length?length =" + "&length=" + this.state.audioLength.split(" ")[0])
        .then(response =>{ 
            this.setState({
                audioUrls: ["https://audiotype-dumpdata.s3.amazonaws.com/media/" + response.data.audio], 
                urlIndex:0, isPlayActive:true,
                audioSegmentsStartTime: response.data.segments.split(" ")
            })

        });
            
        
    }
    SearchAudioHandler = (event,value)=>{
        if(typeof(value)=== 'undefined'){
            //this.setState({bookFound:false})
            //console.log(this.state.bookFound)
            alert("Oops Book not Found")
            return
        }
        this.setState({isSearchResultVisible:true})
        event.preventDefault()
        axios.get("https://audiotypeapi.herokuapp.com/audio/book?title= " + value.replace(/ /g, "+"))
         .then(res=>{

             this.setState({searchResult:res.data['0'],bookTitle:res.data['0']['title'],bookChapters:res.data['0']['chapters']})
         })
         .catch(error => console.log(error))
    }
    SearchInputFieldChangeHandler = (event) =>{
        this.setState({searchInputFieldValue:event.target.value})
        console.log(this.state.searchInputFieldValue)
    }
    ChapterClickedHandler = (event)=>{
        this.setState({audioUrls:[],texts:[],audioSegmentsStartTime: []})
        this.setState({isSearchResultVisible:false})
        this.PlayClickedHandler()
        axios.get("https://audiotypeapi.herokuapp.com/audio/chapter?chapter_id=" + event.target.id + "&length=" + this.state.audioLength.split(" ")[0]) 
        .then(res =>{
            for (let i in res.data){
                this.setState(previousState =>({
                    audioUrls:previousState.audioUrls.concat(res.data[i]["audio"]),
                    texts: previousState.texts.concat(res.data[i]["text"]),
                    audioSegmentsStartTime: previousState.audioSegmentsStartTime.concat([res.data[i]["segments"].split(" ")])
                }))
            }
        })
        .catch(error => console.log(error))
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
        
    }
    NextClickedHandler = ()=>{
        this.state.urlIndex <this.state.audioUrls.length ? this.setState(previousState=>({urlIndex:previousState.urlIndex + 1})) :null
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
        this.setState({isPauseActive:true})
    }
    
    AudioLengthChangedHandler = (event)=>{
        this.setState({audioLength:event.target.innerHTML})
        
    }
    BackDropClickedHandler = ()=>{
        this.setState({isSearchResultVisible:false})
    }
    

    render(){
        
        return(
            <Aux>
                <Modal show = {this.state.isSearchResultVisible} clicked = {this.BackDropClickedHandler}>
                {this.state.isSearchResultVisible ?
                 <SearchResult isResultFound = {this.state.bookFound} book = {this.state.bookTitle} chapters = {this.state.bookChapters} clicked = {this.ChapterClickedHandler}/> : null} 
                </Modal>
                <SearchBar onSubmit = {this.SearchAudioHandler} onChange ={this.SearchInputFieldChangeHandler} randomButtonCliked  = {this.GetRandomAudioURL} book = {this.state.bookTitle} chapters = {this.state.bookChapters}/>
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
                    SettingsMenuBackDropClicked = {this.SettingsClickedHandler}
                    VolumeMenuBackDropClicked = {this.VolumeClickedHandler}
                    
                    
                />
                <TextField audio = {this.state.audioUrls[this.state.urlIndex]} />

                
                
            </Aux>
            
        );
    }
}
export default Audio;