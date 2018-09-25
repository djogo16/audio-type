import React, {Component} from 'react';
import NavigationItem from './NavigationItem/NavigationItem.js';
import classes from './NavigationItems.css';
import {connect} from 'react-redux';
import * as actionTypes from '../../../Actions/Auth';

class NavigationItems extends Component{
    
    render(){
        return(
            <ul className ={classes.NavigationItems}>
                <NavigationItem link = '/'>Scores</NavigationItem>
                {this.props.token ? 
                <NavigationItem onClick = {this.props.logout}>Logout</NavigationItem> : 
                <NavigationItem onClick = {this.props.showAuthContainer}>Login</NavigationItem>
                }
            </ul>
        )
    }
}
    
const mapStateToProps = state => {
    return {
      showAuthContainer : state.showAuthContainer,
      token : state.token,
    //   user : state.user,

    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      showAuthContainer : ()=> dispatch({type : actionTypes.SHOW_AUTH_COMPONENT}),
      logout: () => dispatch({type:actionTypes.LOGOUT_SUCCESSFUL}),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
  