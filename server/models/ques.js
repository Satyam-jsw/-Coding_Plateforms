const mongoose=require('mongoose');


const Schema=mongoose.Schema({
    qid:{
        type:Number,
        required:true
    },
    qtitle:{
     type:String,
     required:true
    },
    qdesc:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
       },
    accr:{
        type:Number,
        required:true
    },
    const:{
        type:String,
        required:true
       },
    inputf:{
        type:String,
        required:true
    },
    outputf:{
        type:String,
        required:true
       },
    input:[{type:String}],
    output:[{type:String}]
    })


    const Que= new mongoose.model('Que',Schema);

    module.exports=Que