const mongoose=require('mongoose');


const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
     type:String,
     required:true,
     unique:true
    },
    password:{
        type:String,
        required:true
    },
    history:[{
      no:{
        type:Number
      },
      name:{
        type:String
      },
      status:{
        type:String
      },
      code:{
        type:String
      }
    }],
    address:{
      type:String
    },
    college:{
      type:String
    },
    image:{
      type: String
    },
    solved:{
     type:Number
    },
    attempted:{
      type:Number
    },
    tokens:[{
      token:{
        type:String
      }
    }],
    })


    const User= new mongoose.model('User',Schema);

    module.exports=User