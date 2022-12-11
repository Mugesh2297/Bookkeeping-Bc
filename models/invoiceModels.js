//Require;
const mongoose = require('mongoose');

//Schema;
const Invoice = new mongoose.Schema({
    productName: {
        type: String,
        collection: String
    },
    price: {
        type: Number,
       
    },
   
    userid: {
        type: String,
       
    },
   customerName:{
    type: String,
    required: true
   },
   noOfUnits:{
    type: Number,
   },
   total:{
    type: Number,
   },
   date:{
    type:Date,
    default: Date.now 
   }

},{timestamps : true});

module.exports = mongoose.model( "Invoice", Invoice )

// "productName":"Product1",
//     "price":"5000",
//     "availableStock":100,
//     "balance":"100"