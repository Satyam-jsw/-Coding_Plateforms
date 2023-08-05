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
router.post('/register', async (req, res) => {
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
router.post('/login', async (req, res) => {
  try 
  {
   
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) 
    {
      return res.json({ status: 0, messageToUser: "Yor are not registered" });
    }
    
    const matchPassword = await bcrypt.compare(req.body.password, user.password);
   
    
    if (matchPassword) 
    {
     
      const token = jwt.sign({ _id: val._id }, process.env.SECRET_KEY);
      
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 4),
        httpOnly: true
      });
    
      return res.json({ status: 0, messageToUser: "You are logged in" });

    }
    res.json({ status: 0, messageToUser: "invalid details" })
  } 
  catch (e) 
  {
    res.json({ status: 0, messageToUser: "invalid details" });
  }

});

router.post('/sendmail', async (req, res) => {
  const id = await User.findOne({ email: req.body.email }).select({ _id: 1 })

  if (!id) 
  {
    return res.json({ messageToUser: "Your are not registered!" })
  }
  const token = jwt.sign({ id: id._id }, process.env.SECRET_KEY, { expiresIn: '1500s' });

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
    from: `<${process.env.USERNAME}>`,
    to: `${req.body.email}`,
    subject: "Reset Your password",
    html: `This link expires in 15 minute https://bitcode.onrender.com/forgetpage/${token}`,
  })

  res.json({ messageToUser: "Check Your Email and reset password!" });
})

router.post('/forgetpassword/:token', async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password
    let token = req.params.token;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ _id: verifyUser.id, email });


    if (!user) {
      res.json({ messageToUser: 'user not found' })
    }
    else {
      password = await bcrypt.hash(password, 12);
      await User.findOneAndUpdate({ _id: verifyUser.id }, { $set: { password: password } });
      res.json({ messageToUser: 'Password reset successfully.' });
    }

  } catch (e) {
    res.json({ messageToUser: 'Link expired.' })
  }
})

module.exports = router;
