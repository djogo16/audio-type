import React, {Component} from 'react';
import Modal from '../../Components/Modal/Modal';
import {connect} from "react-redux";
import * as actionTypes from '../../Actions/Auth';
import Classes from './Auth.css';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
        }

    }
    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        if (this.props.isAuthenticated) {
          this.props.onBackDropClicked()
        }
    }
    LoginClickedHandler =()=>{
      this.props.onBackDropClicked()
      this.props.login(this.state.username,this.state.password)
    }
      render() {
        return (
          <Modal show ={this.props.showLoginComponent && this.props.showAuthContainer} clicked ={this.props.onBackDropClicked} >
            <form className ={Classes.Auth} onSubmit={this.onSubmit}>
              
                <p>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text" 
                    onChange={e => this.setState({username: e.target.value})} />
                </p>
                <p>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password" 
                    onChange={e => this.setState({password: e.target.value})} />
                </p>
                <p>
                  <button type="submit" onClick = {this.LoginClickedHandler}>Login</button>
                </p>
                {
                  this.props.errors.length !== 0 ? <p style={{color:"red"}} >{this.props.errors[0]["message"][0]}</p> : null
                }
                
                <p>
                  Don't have an account? <span onClick = {this.props.onRegisterClicked}>Register</span>
                </p>
                
            </form> 
            
          </Modal>
        
        )
      }
}
const mapStateToProps = state => {
  let errors = [];
  if (state.errors) {
    errors = Object.keys(state.errors).map(field => {
      return {field, message: state.errors[field]};
    });
  }
  return {
    showAuthContainer : state.showAuthContainer,
    showLoginComponent : state.showLoginComponent,
    errors,
    isAuthenticated: state.isAuthenticated,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onRegisterClicked : ()=>dispatch({type : actionTypes.SET_SHOW_REGISTER}),
    onBackDropClicked :()=> dispatch({type : actionTypes.HIDE_AUTH_COMPONENT}),
    login: (username, password) => {
      return dispatch(actionTypes.login(username, password));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

