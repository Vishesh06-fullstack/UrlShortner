const mongoose = require('mongoose');
const {Schema} = mongoose;


const urlSchema = new Schema({
    shortCode : String,
    longUrl : String
})

const Url = mongoose.model("shortUrl" , urlSchema);
module.exports = {Url};