import React, {Component} from 'react';
import axios from 'axios';
import ReactStars from 'react-stars';
import Classes from './Scores.css';
import Styles from '../../Containers/MainBox/TextFied/TextField.css'
import {connect} from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Aux from "../../hoc/Aux";
import Modal from "../../Components/Modal/Modal";
import * as actionTypes from "../../Actions/Auth";
// import Score from "../Scores/Score";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";




class Scores extends Component{
    constructor(props){
        super(props)
        this.state = {
            data : [],
            showModal : false,
            correct_answer:'',
            user_answer: '',
            correct_words_count: 0,
            missed_words_count: 0,
            misspelled_words_count : 0,
            stars : 0,

        }


    }
    componentDidUpdate = () =>{
        let token = localStorage.getItem(['token']);
        if (token === null){
            //this.setState({saveErrorMessage: "You must be logged in to save your scores"})
        }
        else {
            axios({
                method: 'get',
                url: "https://audiotypeapi.herokuapp.com/audio/auth/user/",
                headers:{"authorization" : `Token ${token}` , "content-type": "application/json"}
            }).then(res => {
            axios.get("https://audiotypeapi.herokuapp.com/audio/scores/?username=" + res.data["username"])
            .then(res =>{
                    if(this.state.data.length !==res.data.length){
                        this.setState({data:res.data})
                    }
            })
            })

        }
    }
    scoreClickedHandler = (event) =>{
        this.props.hideSideDrawer();
        let index;
        isNaN(parseInt(event.target.className)) ? index = parseInt(event.target.id) : index = parseInt(event.target.className);
        let score = this.state.data[index];
        this.setState({
            correct_answer: score['correct_answer'],
            user_answer : score['user_answer'],
            correct_words_count: score['correct_count'],
            missed_words_count: score['missed_count'],
            misspelled_words_count : score['misspelled_count'],
            stars : score['stars'],
            showModal : true


       })
    }
    BackDropClickedHandler = ()=>{
        this.setState({showModal:false})
    }
    render(){
        let completeScore = (
        <Modal show = {this.state.showModal} clicked = {this.BackDropClickedHandler}>
            <Aux>
                <div className = {Styles.Summary}>
                    <p style ={{color:"blue"}}>Correct Words: {this.state.correct_words_count}</p>
                    <p style ={{color:"green"}}>Missed Words: {this.state.missed_words_count}</p>
                    <p style ={{color:"red"}}>Misspelled Words: {this.state.misspelled_words_count}</p>
                </div>
                <div className = {Styles.Result}>
                    <div className = {Styles.ResultChildren}>{ReactHtmlParser(this.state.correct_answer)}</div>
                    <div className = {Styles.ResultChildren}>{ReactHtmlParser(this.state.user_answer)}</div>
                </div>
                <div style={{position:"relative",left:"40%"}}><ReactStars value = {this.state.stars} count = {5} color2={'#ffd700'} edit = {false} size = {30}/></div>
                <div style = {{display:'flex', justifyContent:'center'}}>
                    <p style = {{color: 'blue',padding:'5px',cursor:'pointer'}} onClick = {this.BackDropClickedHandler}>OK</p>
                </div>
            </Aux>
        </Modal>

        )

        return(
            <Aux>
                {completeScore}
                <SideDrawer
                    data = {this.state.data}
                    scoreClickedHandler = {this.scoreClickedHandler}
                    open = {this.props.isSideDrawerOpen}
                    closed = {this.props.hideSideDrawer}
                />
            </Aux>

        )
    }
}

const mapStateToProps = state => {
    return {
        isSideDrawerOpen : state.isSideDrawerOpen,

    };
  }
const mapDispatchToProps = dispatch => {
return {
    //showSiderDrawer : () => dispatch({type:actionTypes.SHOW_SIDE_DRAWER}),
    hideSideDrawer : () => dispatch({type:actionTypes.HIDE_SIDE_DRAWER}),
};
}


export default connect(mapStateToProps,mapDispatchToProps)(Scores);