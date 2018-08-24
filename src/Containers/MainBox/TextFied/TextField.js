import React, {Component} from 'react';
import Classes from './TextField.css';
import Aux from '../../../hoc/Aux.js'
class TextField extends  Component{
    constructor(props){
        super(props);
        this.state = {
            isSubmitted: false,
            text: ''  
        };
        this.handleChangedText = this.handleChangedText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangedText(event){
        this.setState({text:event.target.value});
    }
    handleSubmit(event){
        this.setState({text:'Submitted',isSubmitted:true});
        event.preventDefault();
    }
    render(){
        return(
            <Aux>
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