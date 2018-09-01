import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem.js';
import classes from './NavigationItems.css'

const navigationItems = ()=>(
    <ul className ={classes.NavigationItems}>
       <NavigationItem link = '/' >Menu</NavigationItem>
       <NavigationItem link = '/'>Score</NavigationItem>
    </ul>
);
export default navigationItems;