import axios from 'axios';


const bookList = [];
axios.get("https://audiotypeapi.herokuapp.com/audio/books")
    .then(res=>{
        for(let i = 0; i<res.data.length; i++){
            bookList.push(res.data[i].title.trim())
        }
    })


export default bookList;

