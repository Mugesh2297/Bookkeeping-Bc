const dotenv = require("dotenv");
const express = require("express");
const registerRouter = require("./routes/registerRouter");
const auth = require("./Modules/auth");
const productRouter = require("./routes/productRouter");
const expenseRouter = require("./routes/expenseRouter");
const sellerRouter = require ("./routes/sellerRouter");
const customerRouter = require ("./routes/customerRouter");
const purchaseRouter = require ("./routes/purchaseRouter");




const cors = require("cors");





dotenv.config();
const app = express();

app.use(cors({origin:'https://bookkeeping22.netlify.app'}));

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use(express.json());
app.use("/register", registerRouter);

app.use("/",cors(),auth.authenticateUser);
app.use("/products", cors(),productRouter);
app.use("/expenses",cors(),expenseRouter);
app.use("/sellers",cors(),sellerRouter);
app.use("/customers",cors(),customerRouter);
app.use("/purchases",cors(),purchaseRouter);
// app.use("/invoice", invoiceRouter);
// app.use("/url", urlRouter);


// app.use("/api",employeeRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT,()=>{
    console.log(`App is Running on port ${PORT}`);
});
