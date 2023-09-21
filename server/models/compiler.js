var axios = require('axios');
const express=require("express");
const app=express();
app.use(express.json());
var qs = require('qs');

const checkStatus = async (token) => {
 
  const options = {
    method: "GET",
    url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
    params: { base64_encoded: "true", fields: "*" },
    headers: {
      "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    },
  };
  try {
    let response = await axios.request(options);
    let statusId = response.data.status.id;
    // console.log('res222');
    // console.log(response.data);
    if (statusId === 1 || statusId === 2) {
     
      setTimeout(() => {
        checkStatus(token);
      }, 2000);
      return;
    } else {
      let data=response.data;
      //  console.log("dataatg3333",data);
      return await data;
    }
  } catch (error) {
    const err=atob(error);
    // console.log("erratg", err);
    return err;
  }

};
let code = async(val)=>{
  let out;
var data = {
  source_code:btoa(val.code),
language_id:val.id,
stdin:btoa(val.input),
expected_output:btoa(val.output)
};
  //  console.log(data);
var config = {
  method: "POST",
  url: process.env.REACT_APP_RAPID_API_URL,
  params: { base64_encoded: "true", fields: "*" },
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
  },
  data: data,
};

await axios(config)
.then(async function (response) {
  const token = await response.data.token;
  // console.log(token);
  const data=await checkStatus(token)
  // console.log('data4444444444');
  // console.log(data);
  out=await data;
})
.catch(async(err) => {
  let error = err.response ? err.response.data : err;
   out=await error;
  //  console.log('errrrrrrrr');
});
    return out;
};


module.exports=code;