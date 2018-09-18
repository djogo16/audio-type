import React, {Component} from 'react';
import Classes from './TextField.css';
import Aux from '../../../hoc/Aux.js';
import Modal from "../../../Components/Modal/Modal";
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
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
            _words_count: 0,
            showResult : false
        };
        this.handleChangedText = this.handleChangedText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangedText(event){
        this.setState({text:event.target.value});
    }
    handleSubmit(event){
        //this.setState({text:'Submitted',isSubmitted:true});
        this.setState({showResult:true})
        event.preventDefault();
        axios.get(`http://127.0.0.1:8000/audio/results/?text=${this.state.text.replace(/;/g, '')}&path=${this.props.audio}`)
            .then(res =>{
                console.log(res.data)
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

        return(
            <Aux>
                <Modal show = {this.state.showResult} clicked = {this.handleBackDropClicked}>
                    <div className = {Classes.Summary}>
                        <p style ={{color:"blue"}}>Correct Words: {this.state.correct_words_count}</p>
                        <p style ={{color:"green"}}>Missed Words: {this.state.missed_words_count}</p>
                        <p style ={{color:"red"}}>Misspelled Words: {this.state.misspelled_words_count}</p>
                    </div>
                    <div className = {Classes.Result}>
                        <div className = {Classes.ResultChildren}>{ReactHtmlParser(this.state.correct_answer)}</div>
                        <div className = {Classes.ResultChildren}>{ReactHtmlParser(this.state.user_answer)}</div>
                    </div>
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


export default TextField;