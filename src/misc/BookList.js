import axios from 'axios';


const bookList = [];
axios.get("http://127.0.0.1:8000/audio/books")
    .then(res=>{
        for(let i = 0; i<res.data.length; i++){
            bookList.push(res.data[i].title.trim())
        }
    })


export default bookList;

