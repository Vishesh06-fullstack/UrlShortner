const {Url} = require('../model/urlSchema');
const shortId = require('shortid');

const urlShort = async(req , res) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortId.generate();
    const shortUrl = `http://localhost:3001/${shortCode}`

    // save in db
    const newUrl = new Url({shortCode , longUrl})
    await newUrl.save();

    console.log('The data is here' , newUrl);
    res.render("server.ejs" , {shortUrl})
}
const getOriginalUrl = async(req , res) => {
    let {shortCode} = req.params;
    const urlRecord = await Url.findOne({shortCode});

    if(urlRecord){
        res.redirect(urlRecord.longUrl);
    }else{
        res.status(404).send('url not found');
    }
}

module.exports = {urlShort , getOriginalUrl};