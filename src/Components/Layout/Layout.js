import React, {Component} from 'react';
import Aux from '../../hoc/Aux.js';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
// import SideDrawer from '../Navigation/SideDrawer/SideDrawer.js';
import {connect} from 'react-redux';
import * as actionTypes from '../../Actions/Auth';
import Scores from "../Scores/Scores";
class  Layout extends Component{
    
    render(){
        return(
        <Aux>
            {/* <SideDrawer open = {this.props.isSideDrawerOpen} closed= {this.props.hideSideDrawer}/> */}

            <Toolbar clickedToggle = {this.props.hideSideDrawer}/>
            <Scores/>
            <main className = {Classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
} 

const mapStateToProps = state => {
    return {
      isSideDrawerOpen : state.isSideDrawerOpen,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      showSiderDrawer : () => dispatch({type:actionTypes.SHOW_SIDE_DRAWER}),
      hideSideDrawer : () => dispatch({type:actionTypes.HIDE_SIDE_DRAWER}),
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
