const express = require('express');
const router = express.Router();
require('../db/corn');
const Comm = require('../models/discussdb')
const cookies = require("cookie-parser");
router.use(cookies());

const dotenv = require("dotenv")
const path = require('path');
const { type } = require('os');
dotenv.config({ path: './config.env' })

// check user is login or not .
router.get('/discussion', async (req, res) => {
  try {
    const comment = await Comm.find();
    
    res.status(200).json(comment);
  }
  catch (error) {
    res.status(404).json("Server Timeout");
  }
});

router.post('/thread', async (req, res) => {
  try {
    const {id,title,user_name,post,comment} = req.body;
    
    if(post == '') {
      let commentarray=await Comm.findOne({_id:id}).select({_id:false,comments:true});
     
      let comments=commentarray.comments;
         comments.push({user_name,comment});
          await Comm.findOneAndUpdate({_id:id},{$set:{comments}});
        

    } else {
      const data= new Comm({Uname:user_name,title:title,post:post})
      await data.save();
    }
    const comments = await Comm.find();
      res.json(comments);
  }
  catch (error) {
    res.send("Server Timeout");
  }
});


module.exports = router;