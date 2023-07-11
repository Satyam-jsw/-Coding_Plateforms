const express=require("express");
const app=express();
app.use(express.json());

const dotenv=require("dotenv")
const path = require('path')
dotenv.config({path:'.env'})
const port=process.env.PORT;

var cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE']
}));

app.use(require('./router/Route'));
app.use(require('./router/Route1'));

  app.listen(port,()=>{
    console.log(port);
  });