
const mongoose = require('mongoose');

const url = "mongodb://localhost:27017";

mongoose.connect(url)
.then(() => console.log("DB connected"))
.catch((err) => console.log('Error trying to connect to database:' , err));

// using  the spesific database
const db = mongoose.connection.useDb('test');

const userSchema = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    age : {type : Number , required : true},
    at : {type : Date , default : Date.now}
});

// creating a new model of our userSchema if it doesnt exist else use it
const UserModel = db.model('User' , userSchema);

const newUser = new UserModel({
    name: "Mike Ross",
    email: "mike.ross@arkx.group",
    age: 30
});
const newUser2 = new UserModel({
    name: "Mike Ross2",
    email: "mike.ross2@arkx.group",
    age: 30
});
const newUser3 = new UserModel({
    name: "Mike Ross3",
    email: "mike.ross3@arkx.group",
    age: 30
});

// fun to save new user

async function saveUser(user) {
   await user.save()
    .then((user) => console.log("User created successfully",user))
    .catch((err) => console.log("Error creating user :" ,err));  
}

// fetching all users
async function getUsers(model){
   await model.find({})
    .then((users) => console.log("All users :" , users))
    .catch((err) => console.log("Error fetching users" , err));
}


// fetching a spesific user
async function getUser(model ,name , email){
   await model.findOne({name : name , email : email})
    .then((user) => {
        if(user){
            console.log("User :" , user);
        }
        else{
            console.log("User not found");
        }
    })
    .catch((err) => console.log(err));
}

// updating email of user based on his name
async function updateEmail ( model ,name , newEmail){
   await model.findOneAndUpdate(
    { name :  name},
    { $set : {email : newEmail}}
   )
   .then((user) => 
   { if (user) {
    console.log("Updated User email : ", user , "to " , newEmail)
    }
     else {console.log("user nor found")}
    })
   .catch((err) => console.log("Error trying to update user email" , err))
}



// delete users that are created before a spesific date
async function deleteUsers(model , date){
    await model.deleteMany( {at : {$lt : date}})
    .then((result) => 
    {  if(result.deletedCount == 0){
        console.log("no user deleted");
       }
       else{
        console.log(`${result.deletedCount} were deleted successfully`);
       }
    })
    .catch((err) => console.log("Error trying to delete users :" , err));
}


// saveUser(newUser3);
// updateEmail(UserModel , 'Mike Ross' , 'new.mike.ross@arkx.group');
getUser(UserModel , 'Mike Ross2' , 'mike.ross2@arkx.group');
deleteUsers(UserModel , new Date("2024-02-26T21:16:40.065Z"));
getUsers(UserModel);