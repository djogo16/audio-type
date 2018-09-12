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
        axios.get(`http://127.0.0.1:8001/audio/results/?text=${this.state.text}&path=${this.props.audio}`)
            .then(res =>this.setState({correct_answer: res.data.correct_answer,user_answer:res.data.user_answer}))
    }
    render(){

        return(
            <Aux>
                <Modal show = {this.state.showResult}>
                    <div className = {Classes.Result}>
                        <div className = {Classes.ResultChildren}>{ReactHtmlParser(this.state.correct_answer)}</div>
                        <div className = {Classes.ResultChildren}>{ReactHtmlParser(this.state.user_answer)}</div>
                    </div>
                </Modal>
                <form onSubmit = {this.handleSubmit} style={{height :'100%',position:'relative',zIndex:'100'}}>
                    <textarea spellCheck = 'false' className = {Classes.TextField} onChange = {this.handleChangedText} name="message" rows="10" cols="20" value = {this.state.text}></textarea>
                    <br/>
                    <input className = {Classes.Button} type="submit"/>
                </form>
                
            </Aux>

        )
    }
    

}


export default TextField;