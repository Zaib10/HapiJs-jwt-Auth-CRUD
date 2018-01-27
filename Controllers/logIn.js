//import { fail } from 'assert';

const userDb = require('../Models/Users');
const Config = require('../Config');
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt'); 

//-----login-----
const logInController = {};
logInController.login = (request, reply)=>{

    const Email= request.payload.email;
    console.log("email", Email)
    const password = request.payload.password;
    userDb.findOne({email: Email})   
    .then(userData=>{
        if(!userData){
            reply({
                message: "invalid email",
                login: false
            }).code(401)
        }
        else if( Bcrypt.compareSync(password, userData.password)){

            var token = jwt.sign({email: userData.email }, Config.key, { algorithm: 'HS256'} );
            reply(
                {
                token: token,
                Message: "user match",                
                email: userData.email,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: userData.password,
                id: userData._id
                }
            )
        } else{
            reply({
                message: "Invalid Password",
                login: false
            }).code(401)
        }   
    }) 
    .catch((err=>{
        reply({
            error: err
        })
    }))
         
}
module.exports = logInController;