import React, {Component} from 'react'
import Classes from './SearchBar.css'
import SearchResult from '../SearchResult/SearchResult'
import Aux from '../../hoc/Aux'
import { Icon } from 'react-icons-kit';
import {search} from 'react-icons-kit/icomoon/search'
import axios from 'axios'
    

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    
    render(){
        return(
            <Aux>
                <div className = {Classes.SearchBar}>
                    <form  onSubmit = {this.props.onSubmit}>
                        <input  type= 'text' id = 'searchBook' onChange={this.props.onChange} placeholder = 'Search Book or Author to read from'/>
                        <div  className={Classes.SearchButton} onClick = {this.props.onSubmit}><Icon icon = {search}/>
                        </div>
                    </form>
                    <h3>or</h3>
                    <button onClick = {this.props.randomButtonCliked}>Random Audio</button>
                </div>
                
                 {/* {console.log(this.props.displayResult)}  */}
            </Aux>
            
        );
        
        
        
        
        
    }
    
}
export default SearchBar;

