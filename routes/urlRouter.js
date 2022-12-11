const express = require("express");
require("../db/connect");
const router = express.Router();
const URL = require("../models/urlModels");
const randomstring = require("randomstring");
const { default: mongoose } = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../Modules/auth");







router.post("/enterurl", auth.authenticateUser, async function (request, response) {
    try {
    
      if (request.body.origUrl == null) {
        response.json({
          message: "Please enter URL",
        });
      } 

      else {
        request.body.userid = request.body.currentuser._id;
        let random = randomstring.generate(5);
        request.body.shortURL = `${process.env.URL}/${random}`;
        const payload = request.body;
        const newURL = new URL(payload);
        console.log(payload)
        newURL.save((err, data)=>{
            if(err){
                console.log(err);
                return response.status(400).send({message:"Error While adding URL"})
            }
            response.status(200).send({data, message:"URL added"})
        })
       
      }
    } catch (error) {
      console.log(error);
    }
  });



  //get url

  router.get("/enterurl", auth.authenticateUser, async function (request, response) {
    try {

    //   const data = await db
    //     .collection("urls")
    //     .find({ userid: mongodb.ObjectId(request.userid) })
    //     .toArray();
    const data = await URL.find({userid: request.body.currentuser._id })
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



  router.get("/:shortURL", async function (request, response) {
    try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("URLshortener");
      let data = await db
        .collection("urls")
        .findOne({ shortURL: `${url}/${request.params.shortURL}` });
      if (data) {
       // console.log(data);
        let res = await db
          .collection("urls")
          .updateOne(
            { shortURL: `${url}/${request.params.shortURL}` },
            { $inc: { count: 1 } }
          );
        if (res) {
          response.redirect(data.longURL);
        } else {
          response.json({
            message: "something went wrong",
          });
        }
      } else {
        response.json({
          message: "something went wrong",
        });
      }
      await connection.close();
    } catch (error) {
      console.log(error);
    }
  });

  module.exports = router;
