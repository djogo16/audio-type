import React from 'react';
import Classes from "./Scores.css";
import ReactStars from 'react-stars';


        
const score = (props) =>{
    let result;
    props.data.length !== 0 ?
        result = (
            <div className ={Classes.Wrapper} >
                    {
                        props.data.map(score =>{
                            return <div id = {props.data.indexOf(score)} key = {score["id"]} className={Classes.Scores} onClick = {props.scoreClickedHandler}>
                                        <p className = {props.data.indexOf(score)}>{score["book_title"]}</p>
                                        <ReactStars className = {props.data.indexOf(score)}
                                            value = {score["stars"]} 
                                            count = {5} color2={'#ffd700'} 
                                            edit = {false} 
                                            size = {30}
                                        />

                                </div>
                        })
                    }
                </div>
        
        )
             : result = <div><p style = {{color:"red"}}>No scores saved yet!</p></div>
        return(result)
             
}
export default score;
            