import React from 'react';
import classes from './BackDrop.css';

const backDrop = (props) =>{
    let BackDropStyle = null;
    let result = null;
    props.transparent? BackDropStyle = classes.BackDropTransparent : BackDropStyle = classes.BackDrop
    props.show ? result = <div className={BackDropStyle} onClick = {props.clicked}></div> :null
    return result;
};
 export default backDrop;