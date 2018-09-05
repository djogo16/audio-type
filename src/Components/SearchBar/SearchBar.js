import React, {Component} from 'react'
import Classes from './SearchBar.css'
import SearchResult from '../SearchResult/SearchResult'
import Aux from '../../hoc/Aux'
    

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            isSearchResultVisible: true
            
        }
    }
    handleSearchOnSubmit = (event)=>{
        this.setState({isSearchResultVisible:false})
        event.preventDefault()
    }
    render(){
        return(
            <Aux>
                <div className = {Classes.SearchBar}>
                    <form  onSubmit = {this.handleSearchOnSubmit}>
                        <input  type= 'text'  placeholder = 'Search Book or Author to read from'/>
                    </form>
                    <h3>or</h3>
                    <button onClick = {this.props.onClick}>Random Audio</button>
                </div>
                {this.state.isSearchResultVisible ?
                <SearchResult result = "some text"/> : null}
                {console.log(this.state.isSearchResultVisible)}
            </Aux>
            
        );
        
        
        
        
        
    }
    
}
export default SearchBar;

