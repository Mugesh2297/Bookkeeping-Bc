const express = require("express");
require("../db/connect");
const router = express.Router();
const Invoice = require("../models/invoiceModels");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../Modules/auth");


router.post("/createInvoice", auth.authenticateUser, async function (req, res) {
    try{
        req.body.userid = req.body.currentuser._id;
        const payload = req.body;
        const newInvoice = new Invoice(payload);
        newInvoice.save((err, data)=>{
            if (err){
                return res.status(400).send({message:"Error while adding new employee"})
            }
            res.status(200).send({employeeId: data._id, message:"Invoice has been added successfully"})
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
  });



  //get url

  router.get("/getInvoice", auth.authenticateUser, async function (request, response) {
    try {

    const data = await Invoice.find({userid: request.body.currentuser._id });
      if (data) {
        response.json(data);
      } else {
        console.log("User not found");
        response.json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/getInvoice/:id", auth.authenticateUser, async function (request, response) {
    const id = request.params.id;
    try {

    const data = await Product.findOne({_id: id });
      if (data) {
        response.json(data);
      } else {
        console.log("User not found");
        response.json({
          message: "User not found",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });


  
router.put("/updateInvoice/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const updateData = await Invoice.updateOne({_id: id},{$set: { ...request.body }}, {returnDocument: "after"});
          console.log(response);
          response.send(updateData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})


router.delete("/deleteInvoice/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const deleteData = await Invoice.remove({_id: id});
          console.log(response);
          response.send(deleteData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})

  module.exports = router;
