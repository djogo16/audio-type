import React, {Component} from 'react';
import Classes from './TextField.css';
import Aux from '../../../hoc/Aux.js';
import Modal from "../../../Components/Modal/Modal";
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import ReactStars from 'react-stars';

class TextField extends  Component{
    constructor(props){
        super(props);
        this.state = {
            isSubmitted: false,
            text: '' ,
            correct_answer:'',
            user_answer: '',
            correct_words_count: 0,
            missed_words_count: 0,
            misspelled_words_count : 0,
            grade : 0,
            stars : 0,
            showResult : false,
            saveErrorMessage : ""
        };
        this.handleChangedText = this.handleChangedText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangedText(event){
        this.setState({text:event.target.value});
    }
    saveScore = ()=>{
        
        let token = localStorage.getItem(['token']);
        if (token === null){
            this.setState({saveErrorMessage: "You must be logged in to save your scores"})
        }
        else{
            axios({
                method: 'get',
                url: "https://audiotypeapi.herokuapp.com/audio/auth/user/",
                headers:{"authorization" : `Token ${token}` , "content-type": "application/json"} 
            }).then(res => {
                let data = {
                    'correct_answer' : this.state.correct_answer,
                    'user_answer' : this.state.user_answer,
                    'correct_count' : this.state.correct_words_count,
                    'missed_count' : this.state.missed_words_count,
                    'misspelled_count' : this.state.misspelled_words_count,
                    'username' : res.data["username"],
                    'stars' : this.state.stars,
                    'book_title' : this.props.bookTitle
                }
                axios.post("https://audiotypeapi.herokuapp.com/audio/save/",data);
    
                }).catch(error=>console.log(error))
            this.handleBackDropClicked();
        }
        
        
    }
    handleSubmit(event){
        
        
        event.preventDefault();
        axios.get(`https://audiotypeapi.herokuapp.com/audio/results/?text=${this.state.text.replace(/;/g, '')}&path=${this.props.audio}`)
            .then(res =>{
                this.setState({
                    correct_answer: res.data.correct_answer,
                    user_answer:res.data.user_answer,
                    correct_words_count:res.data.correct_words_count,
                    missed_words_count : res.data.missed_words_count,
                    misspelled_words_count: res.data.misspelled_words_count
                })
            }).then(()=>{
            let grade = this.state.correct_words_count / (this.state.missed_words_count+this.state.misspelled_words_count + this.state.correct_words_count)
            this.setState({showResult:true, grade:grade})
            let percentage = this.state.grade * 100;
            if (percentage ===0){
                this.setState({stars:0});
            }
            else if (percentage <= 10){
                this.setState({stars:1});
            }
            else if (percentage > 10 && percentage <= 40){
                this.setState({stars:2});
            }
            else if  (percentage > 40 && percentage <= 60){
                this.setState({stars:3});
            }
            else if (percentage > 60 && percentage <= 80){
                this.setState({stars:4});
            }
            else {this.setState({stars:5})}
            this.setState({text:""}) 
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
                <div style={{position:"relative",left:"40%"}}><ReactStars value = {this.state.stars} count = {5} color2={'#ffd700'} edit = {false} size = {30}/></div>
                <div style = {{display:'flex', justifyContent:'center'}}>
                    <p style = {{color: 'blue',padding:'5px',cursor:'pointer'}} onClick = {this.saveScore}>Save</p>
                    <p style = {{color: 'red', padding:'5px',cursor:'pointer'}} onClick = {this.handleBackDropClicked}>Cancel</p>
                </div>
                <p style = {{color:"red"}}>{this.state.saveErrorMessage}</p>
                
            </Aux>  
                : result = <div><p>Play Audio First!</p></div>

        return(
            <Aux>
                <Modal show = {this.state.showResult} clicked = {this.handleBackDropClicked}>
                    {result}
                </Modal>
                <form onSubmit = {this.handleSubmit} className={Classes.Form}>
                    <textarea id = 'textarea'spellCheck = 'false' className = {Classes.TextField} onChange = {this.handleChangedText} name="message" rows="10" cols="20" value = {this.state.text}></textarea>
                    <br/>
                    <input className = {Classes.Button} value ="Submit" type="submit"/>
                </form>
                
            </Aux>

        )
    }
    

}

export default TextField;