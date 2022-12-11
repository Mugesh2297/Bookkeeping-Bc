//Require;
const mongoose = require('mongoose');

//Schema;
const Product = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        collection: String
    },
    price: {
        type: String,
        required: true
    },
   
    userid: {
        type: String,
       
    },
    bought:{
        type: Number
    },
    sold:{
        type: Number
    }, 
    balance:{
        type: Number
    },
},{timestamps : true});

module.exports = mongoose.model( "Product", Product )

// "productName":"Product1",
//     "price":"5000",
//     "availableStock":100,
//     "balance":"100"