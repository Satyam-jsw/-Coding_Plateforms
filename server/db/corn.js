const mongoose=require("mongoose");

mongoose.connect('mongodb://127.0.0.1/quetionbank',{
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then(()=>{
    console.log("connected");
  }).catch((e)=>{
console.log("not connected");
  })