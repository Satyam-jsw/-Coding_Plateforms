var axios = require('axios');
const express=require("express");
const app=express();
app.use(express.json());
var qs = require('qs');
let code = async(val)=>{
  let out={data:'',err:''};
var data = qs.stringify(val);
var config = {
    method: 'post',
    url: 'https://api.codex.jaagrav.in',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
};

await axios(config)
.then(async function (response) {
 out.data =await response.data.output;

 out.err= await response.data.error;

})
return await  out;
}

module.exports=code;