import React, {Component} from 'react'
import Classes from './SearchResult.css'
import Aux from '../../hoc/Aux'

class SearchResult extends Component{
    constructor(props){
        super(props)
    }

    render(){
        let chapters = []
        for (let chapter in this.props.chapters){
            chapters.push(this.props.chapters[chapter])
            
        }
        //console.log(chapters)
        let output = 
            <Aux >
                <div className = {Classes.SearchResult}>
                    <h3>{this.props.book}</h3>
                    <p>Select chapter to read from:</p>
                    <ul>
                        {chapters.map(c =>{
                            c = c.replace(/^[^.]+\./, "")
                            let c_array = c.split("|")
                            return <li id = {c_array[1]}onClick = {this.props.clicked} key={c_array[1]}>{c_array[0]}</li>
                            })
                        }

                    </ul>
                    </div>
                
            </Aux>
           

        

        return(output)
    }
                
    
}
export default SearchResult