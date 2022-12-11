//Require;
const mongoose = require('mongoose');

//Schema;
const Sellers = new mongoose.Schema({
    SellerName: {
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
        unique:true
    }
},{timestamps : true});

module.exports = mongoose.model( "Sellers", Sellers )

// "productName":"Product1",
//     "price":"5000",
//     "availableStock":100,
//     "balance":"100"