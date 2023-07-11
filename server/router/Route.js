const express=require('express');
const router=express.Router();
const Que=require('../models/ques');
const User=require('../models/user');
const code=require('../models/compiler')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('../db/corn');
const cookies = require("cookie-parser");
router.use(cookies());
router.post('/test', async (req,res)=>{
      
    var data = {
       code: req.body.code,
       language: req.body.language,
       input: req.body.input
   };
   let out= await code(data);
   console.log(out);
   res.send(out);    
});



router.post('/add',async(req,res)=>{
try{
   const data=await Que.find().select({qid:true,_id:false});
   let id=0;
   for(let i=0;i<data.length;i++)
   if(data[i].qid>id)
   id=data[i].qid;
   id=id+1;
   const newq= new Que({
      qid:id,
      qtitle:req.body.qtitle,
      topic:req.body.topic,
      qdesc:req.body.qdesc,
      level:req.body.level,
      accr:req.body.accr,
      const:req.body.const,
      inputf:req.body.inputf,
      outputf:req.body.outputf
   })
const r=await newq.save();
res.json({no:id,message:1})
}catch(e){
res.json({no:-1,message:0});
}
});




router.post('/submit',async(req,res)=>{

let ans={errr:'',p:[]};
   try{
    const token=req.cookies.jwt;
    const verifyUser=jwt.verify(token,process.env.SECRET_KEY);
    const emp=await User.findOne({_id:verifyUser._id});
    let ch=1;
     const qid=req.body.no;
     const q=await Que.find({qid:qid});
     const input1=q[0].input;
     const qtitle=q[0].qtitle;
     const output=q[0].output;
      let p=[];
     for(let i=0;i<input1.length;i++){
     var data = {
       code: req.body.code,
       language: req.body.language,
       input: input1[i]
   };

   let data1= await code(data);
   let errr=data1.err;
   let out=data1.data;
   
   if(errr){
     ans.errr=errr;
   return res.send(ans);
 } 
else{

    let p1=0,p2=0;
    let f=1;
    while(p1<out.length&&p2<output[i].length){
      if(output[i][p2]==='\r'){
       p2++;
     }
     else if(out[p1]===output[i][p2]){
       p1++;p2++;
     }
     else{
       f=0;break;
     }
    }
    while(p2<output[i].length&&(output[i][p2]==='\n'||output[i][p2]==='\r'))
    p2++;
    while(p1<out.length&&(out[p1]==='\n'||out[p1]==='\r'))
    p1++;
   if(p1<out.length||p2<output[i].length)
   f=0;
   if(f==0)
   ch=0;
   p.push(f);
   console.log(f);
 }
  }
  let ok=0;
  let arr=emp.hsitory;
  console.log('op');
  console.log(arr.length);
  let attempted,solved,status;
  if(arr.length==0){
    // i.status='Solved';
    let p1=emp.solved+1,p2=emp.attempted-1;
    console.log({p1,p2});
    solved=emp.solved+1;
    attempted=emp.attempted-1;
  }
  // else
  // for(let i in emp.history){
  //   if(i.no==qid){
  //    ok=1;
  //     if(i.status=='Solved')
  //     break;
  //     else{
  //       if(1){
  //         i.status='Solved';
  //         emp.solved+=1;
  //         emp.attempted-=1;
  //       }
  //     }
  //   }
  // }
    
  //   if(ok===0){
  //    console.log(ch);
  //     if(ch){
  //      emp.history=emp.history.concat({qid,qname,status:"Solved"});
  //      emp.solved= emp.solved+1;
  //     }
      
  //     else{
  //       console.log({no:qid,name:qtitle,status:"Solved"});
  //       emp.history=emp.history.concat({no:qid,name:qtitle,status:"Solved"});
  //       emp.attempted=emp.attempted+1;
  //     }
    
  // }
   console.log(emp);
  await User.findOneAndUpdate({_id:emp._id},{$set:{attempted:emp.attempted,solved:emp.solved,history:emp.hsitory}})
  ans.p=p;
  
  res.send(ans);
   }catch(e){
    console.log('hello');
   res.send(e)}
});




router.post('/input',async(req,res)=>{
  try{
   const no=req.body.id;
   console.log(no);
   let data= await Que.find({qid:no});
   let input=data[0].input;
   let output=data[0].output;
   let input1=req.body.input;
   let output1=req.body.output;
   input=input.concat(input1);
   output=output.concat(output1);
   data[0].input=input;
   data[0].output=output;
   let c=await Que.findOneAndUpdate({qid:no},data[0],{new:1});
   res.json({message:1})
  }catch(e){
    res.json({message:0});
  }

});


router.post('/sendq',async(req,res)=>{
  const no=req.body.no;
 
  const data=await Que.find({qid:no});
  
  res.json(data[0]);
});
router.get('/qlist',async(req,res)=>{
 try{
   const data=await Que.find().select({_id:false,qid:true,qtitle:true,level:true,accr:true});
   
   res.json(data);
 }catch(e){
 }
})


module.exports=router;