//Require;
const mongoose = require('mongoose');

//Schema;
const Purchase = new mongoose.Schema({
    purchasedName: {
        type: String,
        required: true,
        collection: String
    },
    sellerName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userid: {
        type: String,
       
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: String,
        required: true
    }
},{timestamps : true});

module.exports = mongoose.model( "Purchase", Purchase )

// "productName":"Product1",
//     "price":"5000",
//     "availableStock":100,
//     "balance":"100"