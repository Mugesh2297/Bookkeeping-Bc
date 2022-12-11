const express = require("express");
require("../db/connect");
const router = express.Router();
const Product = require("../models/productModels");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../modules/auth");


router.post("/createProduct", auth.authenticateUser, async function (req, res) {
    try{
        req.body.userid = req.body.currentuser._id;
        const payload = req.body;
        const newProduct = new Product(payload);
        newProduct.save((err, data)=>{
            if (err){
                return res.status(400).send({message:"Error while adding new employee"})
            }
            res.status(200).send({employeeId: data._id, message:"Product has been added successfully"})
        })

    }catch(err){
        console.log(err)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
  });



  //get url

  router.get("/getProducts", auth.authenticateUser, async function (request, response) {
    try {

    const data = await Product.find({userid: request.body.currentuser._id });
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

  router.get("/getProducts/:id", auth.authenticateUser, async function (request, response) {
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

  router.get("/getProducts/:productName", auth.authenticateUser, async function (request, response) {
    const name = request.params.productName;
    console.log(name);
    try {

    const data = await Product.find({productName: name });
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

router.put("/updateProducts/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const updateData = await Product.updateOne({_id: id},{$set: { ...request.body }}, {returnDocument: "after"});
          console.log(response);
          response.send(updateData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})
router.put("/updateProducts/:productName", auth.authenticateUser, async function (request, response) {
   
  const productName = request.params.productName;
  try{
      const updateData = await Product.updateOne({productName: productName},{$set: { ...request.body }}, {returnDocument: "after"});
        console.log(response);
        response.send(updateData)
  }catch(err){
      console.log(err);
      response.status(500).send(err);
  }

})


router.delete("/deleteProducts/:id", auth.authenticateUser, async function (request, response) {
   
    const id = request.params.id;
    try{
        const deleteData = await Product.remove({_id: id});
          console.log(response);
          response.send(deleteData)
    }catch(err){
        console.log(err);
        response.status(500).send(err);
    }

})

  module.exports = router;
