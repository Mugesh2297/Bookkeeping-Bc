//Require;
const mongoose = require('mongoose');

//Schema;
const Customers = new mongoose.Schema({
    CustomerName: {
        type: String,
        required: true,
        collection: String
    },
    mobile: {
        type: Number,
        required: true
    },
   
    userid: {
        type: String,
       
    },
    email:{
        type: String,
        required: true,
        unique: true

    }
},{timestamps : true});

module.exports = mongoose.model( "Customers", Customers )

