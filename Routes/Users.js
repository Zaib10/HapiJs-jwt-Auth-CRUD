const userController = require('../Controllers/Users');
const logInController = require('../Controllers/logIn');
const users = [
    {
        method : 'get',
        path : '/api',
        handler : userController.getData
    },
    {
        method : 'post',
        path : '/api/signup',
        config: { auth: false },
        handler : userController.signUp
    },
    {
        method : 'get',
        path : '/api/getUserData',
        
        handler : userController.getUserDataByToken,
    },
    {
        method : 'put',
        path : '/api/updateUser/{id}',
        handler : userController.updateUserData
    }, 
    {
        method : 'delete',
        path : '/api/deleteUser/{id}',
        config: { auth: false },
       
        handler : userController.deleteUser
    },
    {
        method : 'get',
        path : '/api/userFindById/{id}',
        config: { auth: false },
        handler : userController.userFindById
    },
    {
        method : 'post',
        path : '/api/login',
        config: { auth: false },
        handler : logInController.login
    }
];

module.exports = users;

module.exports.myname = "umer";