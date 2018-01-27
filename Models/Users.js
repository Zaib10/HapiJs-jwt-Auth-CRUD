const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = mongoose.Schema({
    firstName : {type: String, require: true},
    lastName : {type: String, require: true},
    email : { type : String, required : true},
    password : { type : String, required : true}  
    
   
})



const user = mongoose.model('user', userSchema ,'user');

module.exports = user;