const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../db/corn');
const User = require('../models/user_data')
const nodemailer = require('nodemailer');
const cookies = require("cookie-parser");
router.use(cookies());

const dotenv=require("dotenv")
const path = require('path')
dotenv.config({path:'.env'})

// check user is login or not .
router.get('/home', async (req, res) => {
  try 
  {

    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: verifyUser._id });

    if (!user) 
    {
      return res.json({ name, email, address, college, attempted, solved, history, messageToUser: 'U r not logged in' })
    }

    return res.json({ name: user.name, email: user.email, address: user.address, college: user.college, attempted: user.attempted, solved: user.solved, history: user.history, messageToUser:'' })

  } 
  catch (error) 
  {
    res.status(404).send("You are not logged in..!");
  }

});

// do registration by user
router.post('/toregister', async (req, res) => {
  try
  {
    const user = await User.find({ email: req.body.email });

    for (i in user) 
    {
      return res.status(400).json({ status: 0, messageToUser: "Your email is alredy registered!" });
    }

    if (req.body.password !== req.body.confirmPassword) 
    {
      return res.status(400).json({ status: 0, messageToUser: "password and confirm password does not match" });
    }

    const password = await bcrypt.hash(req.body.password, 12);
    const data = new User({
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      attempted: 0,
      solved: 0,
      college: req.body.college,
      password: password
    })

    const token = jwt.sign({ _id: data._id }, process.env.SECRET_KEY);

    data.tokens = data.tokens.concat({ token: token });

    if (req.body.remember == 1) 
    {
      res.cookie('jwt', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 4),
        httpOnly: true
      });

    }

     await data.save();

    res.status(200).json({ status: 1, messageToUser: "You registered successfully!" });
  }
  catch (error) 
  {
    res.status(500).send(error);
  }

});

// for be logged in by user.
router.post('/tologin', async (req, res) => {
  try 
  {
    const user = await User.findOne({ email: req.body.email });
    if (!user) 
    {
      return res.json({ status: 0, messageToUser: "Yor are not registered" });
    }
    
    const matchPassword = await bcrypt.compare(req.body.password, user.password);
    console.log(matchPassword);
    
    if (matchPassword) 
    {
      
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      const tokenObj=await User.findOne({_id:user._id}).select({tokens:true});
      const tokenInDb=tokenObj.tokens;
      tokenInDb.push({token});
      await User.findOneAndUpdate({_id:user._id},{$set:{tokens:tokenInDb}})
      
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 4),
        httpOnly: true
      });
     
      return res.json({ status: 1, messageToUser: "You are logged in" });

    }
    res.json({ status: 0, messageToUser: "invalid details" })
  } 
  catch(e) 
  {
    res.json({ status: 0, messageToUser: "invalid details" });
  }

});

router.post('/sendmail', async (req, res) => {
  try
  {
  let idAndtoken = await User.findOne({ email: req.body.email }).select({ _id: 1 ,tokens:1});
 
  const id=idAndtoken._id;
  let tokenInDb=idAndtoken.tokens;

  if (!id) 
  {
    return res.json({ messageToUser: "Your are not registered!" })
  }
  const token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: '600s' });

  await User.findOneAndUpdate({_id:id},{$set:{tokens:tokenInDb}});

  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    prot: 587,
    secure: false,
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD
    }
  });

  let info = await transporter.sendMail({
    from: `"Rahul Singh "<${process.env.USERNAME}>`,
    to: `${req.body.email}`,
    subject: "Reset Your password",
    html: `This link expires in 10 minute http://127.0.0.1:3000/forgetpage/${token}`,
  })

  res.json({ messageToUser: "Check Your Email and reset password!" });
  }
  catch(e)
  {
    res.json({ messageToUser: "details are not correct." });
  }
})

router.post('/forgetpassword/:token', async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password
    let token = req.params.token;
    const tokenObj=await User.findOne({email}).select({tokens:true});
   const tokenInDb=tokenObj.tokens;
   
  for(let i=0;i<tokenInDb.length;i++)
  if(tokenInDb[i].token==token)
  {
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY); 
    const newTokenInDb= tokenObj.tokens.filter((value)=> {return value.token!=token});
  
      password = await bcrypt.hash(password, 12);
      await User.findOneAndUpdate({ _id: verifyUser.id }, { $set: {password: password, tokens:newTokenInDb} });
      return res.json({ messageToUser: 'Password reset successfully.' });
  }

    res.json({messageToUser:'Link has expired !'})
  } catch (e) {
    
    res.json({ messageToUser: 'Link has expired ' })
  }
})

//logout for user
router.delete('/tologout',async(req,res)=>{
  try
  {
     const cookie=req.cookies.jwt;
     const token= jwt.verify(cookie,process.env.SECRET_KEY)
     res.clearCookie('jwt');

     const id=token._id;
     const tokenObj=await User.findOne({_id:id}).select({tokens:true});
     

     const newTokenInDb= tokenObj.tokens.filter((value)=> {return cookie!=value.token});
    
     await User.findOneAndUpdate({_id:id},{$set:{tokens:newTokenInDb}});

     res.json({status:1,messageToUser:'You are logout'});
  }
  catch(e)
  {
    
     res.json({status:0,messageToUser:'You are not logout'});
  }
});

module.exports = router;