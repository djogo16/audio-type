import React from 'react';
import classes from './NavigationItem.css';

const navigationItem = (props) =>(
    <li className = {classes.NavigationItem}>
     <div onClick = {props.onClick} className = {props.active? classes.active:null}>{props.children}</div>  
    </li>
);

export default navigationItem;