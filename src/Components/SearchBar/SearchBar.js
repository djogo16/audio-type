import React, {Component} from 'react'
import Classes from './SearchBar.css'
import SearchResult from '../SearchResult/SearchResult'
import Aux from '../../hoc/Aux'
import { Icon } from 'react-icons-kit';
import {search} from 'react-icons-kit/icomoon/search'
import BookList from '../../misc/BookList'
    

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            showAutoCompleteSuggestions : true
        }
    }
    getBooks (){
        
        let startsWithN = ''
        let containsN = ''
        if (document.getElementById('searchBook') != null) {
            let searchValue= document.getElementById('searchBook').value.toLowerCase()
            searchValue !=='' ? startsWithN = BookList.filter((book) => book.toLowerCase().startsWith(searchValue)): startsWithN =[]
            searchValue !=='' ? containsN = BookList.filter((book) => book.toLowerCase().includes(searchValue)): containsN =[]
            //console.log(startsWithN)
            return startsWithN.concat(containsN)
        }
        //this.setState({books:this.getBooks()})
        return []
    }
    AutoCompleteSuggestionClicked = (e)=>{
        //console.log(e.target.srcElement)
        this.props.onSubmit(e,e.target.innerHTML)
        this.setState({showAutoCompleteSuggestions:false})
    }
    InputOnChange = (e) =>{
        this.props.onChange(e)
        this.setState({showAutoCompleteSuggestions:true})
    }


    
    render(){
        //this.setState({books:this.getBooks()})
        let Suggestions = null
        //console.log(this.state.books)
        let books = []
            this.getBooks().length > 10 ? books = this.getBooks().slice(0,6) : books = this.getBooks();
            Suggestions = books.map(book => <p onClick = {this.AutoCompleteSuggestionClicked}>{book}</p>)
            //console.log("some some") : null
        //console.log("some")
        //this.state.books.length > 5 ? 
          //  this.setState(prev =>({books:prev.books.slice(0,6)})) : null
        
        console.log(Suggestions)

        return(
            <Aux>
                <div className = {Classes.SearchBar}>
                    <div className = {Classes.Wrapper}>
                        <form  onSubmit = {this.props.onSubmit} autoComplete="off">
                            <input  type= 'text' id = 'searchBook' onChange={this.InputOnChange} placeholder = 'Search Book to Read from'/>
                            <div  className={Classes.SearchButton} onClick = {(e) => this.props.onSubmit(e,document.getElementById('searchBook').value )}><Icon icon = {search}/>
                            </div>
                        </form>
                        {this.state.showAutoCompleteSuggestions ?
                        <section>{Suggestions}</section> :null}
                    </div>
                        <h3>or</h3>
                    <button onClick = {this.props.randomButtonCliked}>Random Audio</button>
                </div>
                
                 {/* {console.log(this.props.displayResult)}  */}
            </Aux>
            
        );
        
        
        
        
        
    }
    
}
export default SearchBar;

