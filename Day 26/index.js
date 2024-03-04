const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

client.connect()
.then(() => console.log("connected to MongoDb"))
.catch((err) => console.log("Error: " , err));

const db = client.db('mydb');
const collection = db.collection('users');

collection.insertMany([
     {name : "zakaria" , age : "22"},
     {name : "reda" , age : "25"},
     {name : 'ilyass' , age :'23'}
 ]).then((result) => console.log("users Created Successfully", result.insertedCount))
 .catch((err) => console.log("Error :" , err));


collection.find({}).toArray()
.then((users) => console.log(users))
.catch((err) => console.log(err));



  
