const express = require("express");
require("../db/connect");
const router = express.Router();
const Seller = require("../models/SellerModels");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../Modules/auth");


router.post("/createSeller", auth.authenticateUser, async function (req, res) {
    try{
      let Reset = req.body.email;
      let check = await Seller.findOne({ email: Reset })
      if(check){
          return res.status(400).send({message: "Seller mail id already Exists", code:"existSeller"})
      }
        req.body.userid = req.body.currentuser._id;
        const payload = req.body;
        const newSeller = new Seller(payload);
        newSeller.save((err, data)=>{
            if (err){
                return res.status(400).send({message:"Error while adding new Seller"})
            }
            res.status(200).send({employeeId: data._id, message:"Seller has been added successfully"})
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
  });



  //get url

  router.get("/getSeller", auth.authenticateUser, async function (request, response) {
    try {

    const data = await Seller.find({userid: request.body.currentuser._id });
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

  router.get("/getSeller/:id", auth.authenticateUser, async function (request, response) {
    const id = request.params.id;
    try {

    const data = await Seller.findOne({_id: id });
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

 

router.put("/updateSeller/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
     
      
        const updateData = await Seller.updateOne({_id: id},{$set: { ...request.body }}, {returnDocument: "after"});
          console.log(response);
          response.send(updateData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})



router.delete("/deleteSeller/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const deleteData = await Seller.remove({_id: id});
          console.log(response);
          response.send(deleteData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})

  module.exports = router;
