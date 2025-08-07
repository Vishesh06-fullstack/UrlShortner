const express = require('express');
const app = express();
const path = require('path');

const {urlShort , getOriginalUrl} = require('./Controllers/url.js');
const mongoose = require('mongoose');

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.static(path.join(__dirname , 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const MONGO_URI = 'mongodb://127.0.0.1:27017/URLshortner';
const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MONGODB CONNECTED');
    } catch (error) {
        console.log('CONNECTTION FAIL CHECK ERROR');
    }
}
connectDB();

app.get('/' , (req , res) => {
    res.render("server.ejs" , {shortUrl:null})
})

// handle url submission
app.post('/shorten' , urlShort );

// redirect to url original url using short url
app.get('/:shortCode' , getOriginalUrl)

app.listen(3001 , () => {
    console.log(`project is listening at 3001`);
})