import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems.js'
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux.js'
import BackDrop from '../../BackDrop/BackDrop';
import Score from '../../Scores/Score';


const sideDrawer = (props) =>{
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer,classes.Open]
    }
    return(
        <Aux>
        <BackDrop show = {props.open} clicked = {props.closed}/>
            <div className = {attachedClasses.join(' ')}>
    
                
            <Score data = {props.data} scoreClickedHandler = {props.scoreClickedHandler} />
            </div>
        </Aux>
    );
};
export default sideDrawer;