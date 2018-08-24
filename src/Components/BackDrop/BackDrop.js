import React from 'react';
import classses from './BackDrop.css';

const backDrop = (props) =>(
    props.show ?  <div className={classses.BackDrop} onClick = {props.clicked}></div> :null

);
 export default backDrop;