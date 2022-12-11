const express = require("express");
require("../db/connect");
const router = express.Router();
const Purchase = require("../models/purchaseModels");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../modules/auth");


router.post("/createPurchase", auth.authenticateUser, async function (req, res) {
    try{
        req.body.userid = req.body.currentuser._id;
        
        const payload = req.body;
        const newPurchase = new Purchase(payload);
        newPurchase.save((err, data)=>{
            if (err){
                return res.status(400).send({message:"Error while adding new Purchase"})
            }
            res.status(200).send({employeeId: data._id, message:"Purchase data has been added successfully"})
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
  });



  //get url

  router.get("/getPurchase", auth.authenticateUser, async function (request, response) {
    try {

    const data = await Purchase.find({userid: request.body.currentuser._id });
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

  router.get("/getPurchase/:id", auth.authenticateUser, async function (request, response) {
    const id = request.params.id;
    try {

    const data = await Purchase.findOne({_id: id });
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

 

router.put("/updatePurchase/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const updateData = await Purchase.updateOne({_id: id},{$set: { ...request.body }}, {returnDocument: "after"});
          console.log(response);
          response.send(updateData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})



router.delete("/deletePurchase/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const deleteData = await Purchase.remove({_id: id});
          console.log(response);
          response.send(deleteData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})

  module.exports = router;
