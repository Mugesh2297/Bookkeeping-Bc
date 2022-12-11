const mongoose = require("mongoose");

//Schema definition
const expenseSchema = new mongoose.Schema({
    transactionName:{
        type:String,
        required: true,
    },
    type:{
        type:String,
        required: true,
    },
    amount:{
        type:Number,
        required: true,
    },
    userid: {
        type: String,
       
    },
    description:{
       type:String,
    },
    date:{
        type:Date,
    default: Date.now
    }
})


//Model creation 
module.exports = mongoose.model('expenses', expenseSchema);