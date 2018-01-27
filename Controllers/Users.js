const User = require('../Models/Users');
const Bcrypt = require('bcrypt'); 

const controller = {};
controller.getData = (request, reply)=>{
    reply("welcome")
};

//---Post User Data------

controller.signUp = (request, reply)=>{
    const payloadData = request.payload;
    console.log(payloadData);
    password = payloadData.password;    
    payloadData.password = Bcrypt.hashSync(password, Bcrypt.genSaltSync(9));
    var Email= payloadData.email;
    User.findOne({email: Email})
        .then(data=>{
            if(!data){
                return User.create(payloadData)
                //reply({mesage: "User Created Successfuly!!!"})
            }else {
                return Prompise.reject({type: "User not found", message: "Email already exist"})
            } 
        }).then(user=> {
            reply({
                message: "User Created Successfully",
                data : user
            })
        })
        .catch((err)=>{
            if(err.type && err.type== "User not found"){
                reply (err)
            }else{
                reply(err)
            }
        })
        
    //     , (err, data)=>{
    //     if(!data){
    //         User.create(payloadData)
    //         reply({mesage: "User Created Successfuly!!!", data})
    //     }else{
    //         reply({mesage: "User already exist!!!", data})
    //     }

    // }).catch((err=>{
    //     reply({
    //         error: err
    //     })
    // }))
   
}

//--- Get User Data------

controller.getUserDataByToken = (request, reply)=>{
    const email= request.activatedUserEmail
    User.findOne({email})
    .then(data=>{
        reply(data)
    })    
    .catch(err=>{
        reply("Error:", err)
    })
}

//---Update User data----

controller.updateUserData = (request, reply)=>{
    const id = request.params.id;
    console.log(request.payload);
     User.findByIdAndUpdate({_id:id} , { $set: request.payload }, { new: true }, (err, data)=>{
        if(err){
            console.log(err)
            reply(err)
        }else{
            console.log(data)
            reply(data)
        }
     })
    
         
     
}


//----Delete User Data------

controller.deleteUser = (request, reply) => {
    const id = request.params.id
    //console.log("this record hasbeen deleted",id)
    User.deleteOne({ _id: id })
        .then(function (data) {
            reply(data)
        })
        .catch(function (err) {
            reply(err)
        })
}
//---Find One-----

controller.userFindById = (request, reply) => {
    const id = request.params.id;
    console.log("id is :::" ,id)
    User.findOne({ _id:id }, (err, data)=>{
        if(err){
            reply("Error occured", err)
        }
        else {
            reply(data)
        }
    })
     
    
}

module.exports = controller;