import React, {Component} from 'react'
import Classes from './SearchBar.css'
import Aux from '../../hoc/Aux'
import { Icon } from 'react-icons-kit';
import {search} from 'react-icons-kit/icomoon/search'
import BookList from '../../misc/BookList'
import BackDrop from "../../Components/BackDrop/BackDrop";

    

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
            return startsWithN.concat(containsN)
        }
        return []
    }
    BackDropClickedHandler = ()=>{
        this.setState({showAutoCompleteSuggestions:false})

    }
    AutoCompleteSuggestionClicked = (e)=>{
        this.props.onSubmit(e,e.target.innerHTML)
        this.setState({showAutoCompleteSuggestions:false})
    }
    InputOnChange = (e) =>{
        this.props.onChange(e)
        this.setState({showAutoCompleteSuggestions:true})
    }


    
    render(){
        
        let Suggestions = null
        let books = []
            this.getBooks().length > 10 ? books = this.getBooks().slice(0,6) : books = this.getBooks();
            Suggestions = books.map(book => <p key ={book} onClick = {this.AutoCompleteSuggestionClicked}>{book}</p>)
        return(
            <Aux>
                <BackDrop show ={this.state.showAutoCompleteSuggestions} clicked = {this.BackDropClickedHandler} transparent/>
                <div className = {Classes.SearchBar}>
                    <div className = {Classes.Wrapper}>
                        <form  onSubmit = {this.props.onSubmit} autoComplete="off">
                            <div className={Classes.SearchButton} onClick = {(e) => this.props.onSubmit(e,document.getElementById('searchBook').value )}><Icon icon = {search}/></div>
                            <input  type= 'text' id = 'searchBook' onChange={this.InputOnChange} placeholder = 'Search Book to Read from'/>
                        </form>
                        {this.state.showAutoCompleteSuggestions ?
                        <section>{Suggestions}</section> :null}
                    </div>
                    <p onClick = {this.props.randomButtonCliked}>Random Audio</p>
                </div>
                
                 {/* {console.log(this.props.displayResult)}  */}
            </Aux>
            
        );
        
        
        
        
        
    }
    
}
export default SearchBar;

