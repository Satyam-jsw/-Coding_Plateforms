const express=require("express");
const app=express();
app.use(express.json());

const dotenv=require("dotenv")
const path = require('path')
dotenv.config({path:'.env'})
const port=process.env.PORT;

//allow permission for all origin to access backend
var cors = require('cors');
app.use(
  cors({
       origin: '*',
       methods: ['GET','POST','PUT','DELETE'],
       Credential:true,
       Headers: 'Authorization'
      })
);

//import all router
app.use(require('./router/Route_authentication'));
app.use(require('./router/Route_code_problem'));
app.use(require("./router/Route_discussion"));
  app.listen(port,()=>{
    console.log(port);
   });
   