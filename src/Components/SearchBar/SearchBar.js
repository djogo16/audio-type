import React from 'react'
import Classes from './SearchBar.css'
const searchBar = (props) =>(
    <div className = {Classes.SearchBar}>
        <input type= 'text' placeholder = 'Search Book or Author to read from'/>
        <h3>or</h3>
        <button onClick = {props.onClick}>Random Audio</button>
    </div>
);
export default searchBar;
