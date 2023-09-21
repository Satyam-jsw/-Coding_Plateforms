const mongoose=require('mongoose');

/*{comment_id,comment_ques,comment_replies}*/

const Schema=mongoose.Schema({
   
        Uname:{
            type:String
        },
        post:{
            type:String
        },
        title: {
            type: String
        },
        comments: [
            {
                user_name:{
                    type:String
                },
                comment:{
                    type:String
                }
            }
        ]
        
})
   
//comment store in database
const Comm = new mongoose.model('Comm',Schema);
module.exports = Comm;
