const express = require("express");
require("../db/connect");
const router = express.Router();
const Customer = require("../models/CustomerModels");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../Modules/auth");


router.post("/createCustomer", auth.authenticateUser, async function (req, res) {
    try{
        req.body.userid = req.body.currentuser._id;
        let Reset = req.body.email;
        let check = await Customer.findOne({ email: Reset })
        if(check){
            return res.status(400).send({message: "Customer mail id already Exists", code:"existCustomer"})
        }
        const payload = req.body;
        const newCustomer = new Customer(payload);
        newCustomer.save((err, data)=>{
            if (err){
                return res.status(400).send({message:"Error while adding new Customer"})
            }
            res.status(200).send({employeeId: data._id, message:"Customer has been added successfully"})
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
  });



  //get url

  router.get("/getCustomer", auth.authenticateUser, async function (request, response) {
    try {

    const data = await Customer.find({userid: request.body.currentuser._id });
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

  router.get("/getCustomer/:id", auth.authenticateUser, async function (request, response) {
    const id = request.params.id;
    try {

    const data = await Customer.findOne({_id: id });
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

 

router.put("/updateCustomer/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const updateData = await Customer.updateOne({_id: id},{$set: { ...request.body }}, {returnDocument: "after"});
          console.log(response);
          response.send(updateData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})



router.delete("/deleteCustomer/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const deleteData = await Customer.remove({_id: id});
          console.log(response);
          response.send(deleteData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})

  module.exports = router;
