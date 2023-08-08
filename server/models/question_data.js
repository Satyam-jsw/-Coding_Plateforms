const mongoose=require('mongoose');

/*{question_id,question_title,question_topic,question_description,acceptance_rate,question_level,
    constraints,input_description,output_description}*/

const Schema=mongoose.Schema({
    question_id:{
        type:Number,
        required:true
    },
    question_title:{
     type:String,
     required:true
    },
    question_topic:{
        type:String,
        required:true
    },
    question_description:{
        type:String,
        required:true
    },
    question_level:{
        type:String,
        required:true
       },
    acceptance_rate:{
        type:Number
    },
    constraints:{
        type:String,
        required:true
       },
    input_description:{
        type:String,
        required:true
    },
    output_description:{
        type:String,
        required:true
       },
    input:[{type:String}],
    output:[{type:String}]
    })
   
//question store in database
    const Que= new mongoose.model('Que',Schema);

    module.exports=Que;
