import axios from 'axios';


const bookList = [];
let config = {
    headers: {'Access-Control-Allow-Origin': '*',"Access-Control-Allow-Methods":"*"}
};

axios.get("https://audiotypeapi.herokuapp.com/audio/books/",config)
    .then(res=>{
        for(let i = 0; i<res.data.length; i++){
            bookList.push(res.data[i].title.trim())
        }
    })


export default bookList;

