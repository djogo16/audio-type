import React from 'react';
import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems.js'
import Logo from '../../Logo/Logo.js'
import ToggleButton from '../ToggleButton/ToggleButton'
const toolbar  = (props)=>(
    <header className = {classes.Toolbar}>
        <ToggleButton clicked = {props.clickedToggle}/>
        <Logo/>
        {/* <nav className={classes.DesktopOnly}> */}
            {/* <NavigationItems/> */}
        {/* </nav> */}
    </header>

);
export default toolbar;