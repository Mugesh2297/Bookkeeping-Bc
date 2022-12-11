//Require;
const mongoose = require('mongoose')

//Schema;
const URL = new mongoose.Schema({
    origUrl: {
        type: String,
        required: true,
        collection: String
    },
    shortURL: {
        type: String,
        required: true
    },
   
    userid: {
        type: String,
       
    },
    count:{
        type: Number
    }
},{timestamps : true});

module.exports = mongoose.model( "URL_Short",URL )