import React, {Component} from "react";
import {connect} from "react-redux";
import Modal from '../../Components/Modal/Modal'
import Classes from './Auth.css'
import * as actionTypes from '../../Actions/Auth';
class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
        }

    }
  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state.username, this.state.password);
    if (this.props.isAuthenticated) {
        this.props.onBackDropClicked()
      }
      
  }

  render() {
    return (
    <Modal show ={this.props.showRegisterComponent && this.props.showAuthContainer} clicked ={this.props.onBackDropClicked} >
      <form className = {Classes.Auth} onSubmit={this.onSubmit}>
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>
          {
              this.props.errors.length !== 0 ? <p style={{color:"red"}} >{this.props.errors[0]["message"][0]}</p> : null
          }
          <p>
            Already have an account? <span onClick = {this.props.onLoginClicked}>Login</span>
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
    showRegisterComponent : state.showRegisterComponent,
    errors,
    isAuthenticated: state.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginClicked : ()=>dispatch({type : actionTypes.SET_SHOW_LOGIN}),
    onBackDropClicked :()=> dispatch({type : actionTypes.HIDE_AUTH_COMPONENT}),
    register: (username, password) => dispatch(actionTypes.register(username, password)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);