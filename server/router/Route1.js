const express=require('express');
const router1=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('../db/corn');
const User=require('../models/user')
const nodemailer=require('nodemailer');
const cookies = require("cookie-parser");
router1.use(cookies());
router1.get('/home',async(req,res)=>{
  
  try{
    
    const token=req.cookies.jwt;
   
    const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
   
    const emp=await User.findOne({_id:verifyUser._id});
    if(!emp){
        return res.json({name,email,address,college,attempted,solved,hsitory,msg:'U r not logged in'})
    }
   
    return res.json({name:emp.name,email:emp.email,address:emp.address,college:emp.college,attempted:emp.attempted,solved:emp.solved,hsitory:emp.history,msg:''})
   
}catch(error){
  
    res.status(404).send("You are not logged in..!");
}
})
router1.post('/register',async(req,res)=>{
console.log(req.body);
    try{
      const fin=await User.find({email:req.body.email});
     
     for(ele in fin){
        return res.status(400).json({status:0,message:"Your email is alredy registered!"});
      }
      if(req.body.password!==req.body.cpassword){
        return res.status(400).json({status:0,message:"password and confirm password does not match"});
      }

      const password=await bcrypt.hash(req.body.password,12);
      const data= new User({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        attempted:0,
        solved:0,
        college:req.body.college,
        password:password
      })
      
      const token=jwt.sign({_id:data._id},process.env.SECRET_KEY);
      
      data.tokens=data.tokens.concat({token:token});
      
      if(req.body.remember==1){
        res.cookie('jwt',token,{
          expires:new Date(Date.now()+1000*60*60*24*365*4),
          httpOnly:true
        });
      }
    
      const val=await data.save();
   
      res.status(200).json({status:1,message:"You registered successfully!"});
    }
    
    catch(e){
      
      res.status(500).send(e);
    }
});
router1.post('/login',async(req,res)=>{
  try{
      console.log(req.body);
       const val = await User.findOne({email:req.body.email});
    
       if(!val){
        return res.json({status:0,message:"Yor are not registered"});
       }
       const mod=await bcrypt.compare(req.body.password,val.password);
        console.log(mod)
      if(mod){
       const token =jwt.sign({_id:val._id},process.env.SECRET_KEY);
       console.log(mod);
       
       res.cookie("jwt",token,{
        expires:new Date(Date.now()+1000*60*60*24*365*4),
        httpOnly:true
       });
      
      return res.json({status:0,message:"You are logged in"});

    }
      res.json({status:0,message:"invalid details"})
  }catch(e){
    res.json({status:0,message:"invalid details"});
  }
})

router1.post('/sendmail',async(req,res)=>{
  const id=await User.findOne({email:req.body.email}).select({_id:1})
if(!id){
  return res.json({message:"Your are not registered!"})
}
const token= jwt.sign({id:id._id},process.env.SECRET_KEY,{expiresIn:'1500s'});
  const transporter=await nodemailer.createTransport({
    service:'gmail',
    prot:587,
    secure:false,
    auth:{
      user:'4444singhrahul@gmail.com', 
      pass:'extnrriogplzpwyl'
    }
  });
  let info=await transporter.sendMail({
    from:`"Rahul Singh "<${process.env.USERNAME}>`,
    to:`${req.body.email}`,
    subject:"Reset Your password",
    html:`This link expires in 15 minute http://127.0.0.1:3000/forgetpage/${token}`,
  })
  res.json({message:"Check Your Email and reset password!"});
})

router1.post('/forgetpassword/:token',async(req,res)=>{
  try{ 
   let email=req.body.email;
   let password=req.body.password
  let token=req.params.token;
  const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
   console.log(verifyUser);   
  const emp=await User.findOne({_id:verifyUser.id,email});


  if(!emp){
  res.json({message:'user not found'})
  }
  else{
      password=await bcrypt.hash(password,12);
    await User.findOneAndUpdate({_id:verifyUser.id},{$set:{cpassword:req.body.password,password:password}});
   res.json({message:'Password reset successfully.'});}

  }catch(e){
      console.log(e);
      res.json({message:'Link expired.'})
  }
})

module.exports=router1;