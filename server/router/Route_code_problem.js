const express = require('express');
const router = express.Router();
const Que = require('../models/question_data');
const User = require('../models/user_data');
const code = require('../models/compiler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('../db/corn');
const cookies = require("cookie-parser");
router.use(cookies());

//giving output to user for his input and code
router.post('/test', async (req, res) => {

  var data = {
    code: req.body.code,
    language: req.body.language,
    input: req.body.input
  };

  let Output = await code(data);
  console.log(Output);
  res.send(Output);
});


/*add new questions property
{question_id,question_title,question_topic,question_description,question_level,acceptance_rate,
  constraints,input_description,output_description}*/

router.post('/add', async (req, res) => {
 
  try 
  {
    const data = await Que.find().select({ question_id: true, _id: false });
    let id = -1;
    data.sort();
    for (let i = 0; i < data.length; i++)
      if (data[i].question_id !=i+1)
        id=i+1;

    if(id==-1)
      id=1+data.length;
    const newQuestion = new Que({
      question_id: id,
      question_title: req.body.question_title,
      question_description: req.body.question_description,
      question_topic:req.body.question_topic,
      question_level: req.body.question_level,
      acceptance_rate: 0,
      constraints: req.body.constraints,
      input_description: req.body.input_description,
      output_description: req.body.output_description
    })
    // save question in database
    await newQuestion.save();

    res.json({ no: id, messageToUser: 1 })
  } 
  catch (e) 
  {
    res.json({ no: -1, messageToUser: 0 });
  }
});


//match the output by user'code with the uotput present in database

router.post('/submit', async (req, res) => {

  let answer = { error: '', result: [] };
  try {

    let check = 1;
    const question_id = req.body.no;
    const question = await Que.find({ question_id });
    const input1 = question[0].input;
    const origenal_output = question[0].output;
    const question_name = question[0].question_title;
    let result = [];

    for (let i = 0; i < input1.length; i++) 
    {

      var data = {
        code: req.body.code,
        language: req.body.language,
        input: input1[i]
      };

      let OutputPerTest = await code(data);
      let error = OutputPerTest.err;
      let Output = OutputPerTest.data;
      if (error) {
        answer.error = error;
        return res.send(answer);
      }
      else 
      {

        let flag1 = 0, flag2 = 0;
        let flag = 1;
        while (flag1 < Output.length && flag2 < origenal_output[i].length) {
          if (origenal_output[i][flag2] === '\r') {
            flag2++;
          }
          else if (Output[flag1] === origenal_output[i][flag2]) {
            flag1++;
            flag2++;
          }
          else {
            flag = 0;
            break;
          }
        }

        while (flag2 < origenal_output[i].length && (origenal_output[i][flag2] === '\n'
          || origenal_output[i][flag2] === '\r'))
          flag2++;

        while (flag1 < Output.length && (Output[flag1] === '\n' || Output[flag1] === '\r'))
          flag1++;

        if (flag1 < Output.length || flag2 < origenal_output[i].length)
          flag = 0;

        if (flag == 0)
          check = 0;

        result.push(flag);
        console.log(flag);

      }
    }
   //check all testcases are passed or not.
    let ok = 0;
    for (let i = 0; i < result.length; i++)
    {
      if (result[i] == 0)
        ok = 1;
    }
  
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const User = await User.findOne({ _id: verifyUser._id });
    
    //update question details in userdatabse.
    let historyArray = User.history;
    let attempted, solved, status;
    

    if (historyArray.length == 0) 
    {
      if (ok == 0) 
      {
        historyArray.push({ no: question_id, name: question_name, status: 'Solved', code: req.body.code });
        solved = User.solved + 1;
      }
      else 
      {
        historyArray.push({ no: question_id, name: question_name, status: 'Attempted', code: req.body.code });
        attempted = User.attempted + 1;
      }
    }
    else 
    {
      let questionIsPresent = true;
      for (let i = 0; i < historyArray.length; i++) 
      {
        if (historyArray[i].no == question_id) 
        {
          questionIsPresent = false;
          if (i.status == 'Solved')
            break;
          else 
          {
            if (ok) 
            {
              historyArray[i] = { no: question_id, name: question_name, status: 'Solved', code: req.body.code };
            }
          }
        }

      }
      if (questionIsPresent) 
      {
        historyArray.push({ no: question_id, name: question_name, status: 'Attempted', code: req.body.code });
        attempted = emp.attempted + 1;
      }
    }

    await User.findOneAndUpdate({ _id: emp._id }, { $set: { attempted: attempted, solved: solved, history: historyArray } })
    answer.result = result;

    res.send(answer);

  } 
  catch (error) 
  {
    console.log(error);
    res.send(error);
  }
});




router.post('/input', async (req, res) => {
  try 
  {
    const no = req.body.id;
    let data = await Que.findOne({ question_id: no });
    let input = data.input;
    let output = data.output;
    let input1 = req.body.input;
    let output1 = req.body.output;

     input = [...input,...input1];
     output = [...output,...output1];
     
    let c = await Que.findOneAndUpdate({ question_id: no },{$set:{input,output}});
    res.json({ messageToUser: 1 })
  } 
  catch (e)
  {
    res.json({ messageToUser: 0 });
  }

});

//send question description
router.post('/sendq', async (req, res) => {
  const no = req.body.no;

  const data = await Que.find({ question_id: no });

  res.json(data[0]);
});

//send question list form databse
router.get('/qlist', async (req, res) => {
  try 
  {
    
    const data = await Que.find().select({ _id: false, question_id: true, question_title: true, question_level: true, acceptance_rate: true });
    res.json(data);
  } 
  catch (e) 
  {
    res.json("hello!.not found")
  }
})


module.exports = router;
