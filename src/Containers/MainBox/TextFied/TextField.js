import React, {Component} from 'react';
import Classes from './TextField.css';
import Aux from '../../../hoc/Aux.js';
import Modal from "../../../Components/Modal/Modal";
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import {connect} from 'react-redux';
import * as actionTypes from '../../../Actions/Auth';
class TextField extends  Component{
    constructor(props){
        super(props);
        //this.props.loadUser()
        this.state = {
            isSubmitted: false,
            text: '' ,
            correct_answer:'',
            user_answer: '',
            correct_words_count: 0,
            missed_words_count: 0,
            misspelled_words_count : 0,
            _words_count: 0,
            showResult : false
        };
        this.handleChangedText = this.handleChangedText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangedText(event){
        this.setState({text:event.target.value});
    }
    saveScore = ()=>{
        
        let token = localStorage.getItem(['token']);
        console.log(`Token ${token}`)

        
        //axios.post("http://127.0.0.1:8000/audio/save/",data)
        axios({
            method: 'get',
            url: "http://127.0.0.1:8000/audio/auth/user/",
            headers:{"authorization" : `Token ${token}` , "content-type": "application/json"} 
        }).then(res => {
            console.log(res.data["username"]);
            let data = {
                'correct_answer' : this.state.correct_answer,
                'user_answer' : this.state.user_answer,
                'correct_count' : this.state.correct_words_count,
                'missed_count' : this.state.missed_words_count,
                'misspelled_count' : this.state.misspelled_words_count,
                'username' : res.data["username"]
            }
            axios.post("http://127.0.0.1:8000/audio/save/",data)

            })
        
        this.handleBackDropClicked()
    }
    handleSubmit(event){
        this.setState({showResult:true})
        event.preventDefault();
        axios.get(`http://127.0.0.1:8000/audio/results/?text=${this.state.text.replace(/;/g, '')}&path=${this.props.audio}`)
            .then(res =>{
                this.setState({
                    correct_answer: res.data.correct_answer,
                    user_answer:res.data.user_answer,
                    correct_words_count:res.data.correct_words_count,
                    missed_words_count : res.data.missed_words_count,
                    misspelled_words_count: res.data.misspelled_words_count
                })
            })
    }
    handleBackDropClicked = ()=>{
        this.setState({showResult:false})
    }
    render(){
        let result = '';
        this.state.correct_answer !== '' ? 
        result = 
            <Aux>
                <div className = {Classes.Summary}>
                    <p style ={{color:"blue"}}>Correct Words: {this.state.correct_words_count}</p>
                    <p style ={{color:"green"}}>Missed Words: {this.state.missed_words_count}</p>
                    <p style ={{color:"red"}}>Misspelled Words: {this.state.misspelled_words_count}</p>
                </div>
                <div className = {Classes.Result}>
                    <div className = {Classes.ResultChildren}>{ReactHtmlParser(this.state.correct_answer)}</div>
                    <div className = {Classes.ResultChildren}>{ReactHtmlParser(this.state.user_answer)}</div>
                </div>
                <div style = {{display:'flex', justifyContent:'center'}}>
                    <p style = {{color: 'blue',padding:'5px'}} onClick = {this.saveScore}>Save</p>
                    <p style = {{color: 'red', padding:'5px'}} onClick = {this.handleBackDropClicked}>Cancel</p>
                </div>
            </Aux>  
                : result = <div><p>Play Audio First!</p></div>

        return(
            <Aux>
                <Modal show = {this.state.showResult} clicked = {this.handleBackDropClicked}>
                    {result}
                </Modal>
                <form onSubmit = {this.handleSubmit} style={{height :'100%',position:'relative',zIndex:'100'}}>
                    <textarea spellCheck = 'false' className = {Classes.TextField} onChange = {this.handleChangedText} name="message" rows="10" cols="20" value = {this.state.text}></textarea>
                    <br/>
                    <input className = {Classes.Button} value ="Submit" type="submit"/>
                </form>
                
            </Aux>

        )
    }
    

}
const mapStateToProps = state => {
    return { user : state.user}
}
//const mapDispatchToProps = dispatch => {
    //return {
      //loadUser: () => dispatch({type : actionTypes.USER_LOADED}),
      //loadUser: () => dispatch(actionTypes.loadUser()),
    //};
  //}

export default connect(mapStateToProps)(TextField);