const express = require('express');
const mongo = require('mongodb').MongoClient;
var app = express();
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(express.static(__dirname +'/View'));

var dbmon = mongo.connect('mongodb://localhost:27017/QA');

app.get('/',(req,res)=>{
  res.sendFile(__dirname +"/View/main.html");
  console.log("Sign in Page....");
});
app.post('/',urlencodedParser,(req,res)=>{
  dbmon.then((db)=>{
    db.collection('Users').insertOne(req.body);
  console.log("Users logged ");;
  });
  res.sendFile(__dirname +"/View/ask.html");
});
app.get('/home',(req,res)=>{
  res.sendFile(__dirname +"/View/QA.html");
  console.log("Home Page....");
});
  app.post('/ask',urlencodedParser,(req,res)=>{
  dbmon.then((db)=>{
    delete req.body._id;
    db.collection('Questions').insertOne(req.body);
 console.log('Updated successfully......');
  });
  res.sendFile(__dirname +"/View/QA.html");
});




app.listen(3000);
