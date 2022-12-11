
const mongoose = require('mongoose');
require('dotenv').config();
let Link = process.env.MONGO_URL

mongoose.connect(`${Link}`,{ useNewUrlParser: true,useUnifiedTopology: true}).then(() => {
    console.log("DB Connected Done");
}).catch((error) => {
    console.log(error);
})