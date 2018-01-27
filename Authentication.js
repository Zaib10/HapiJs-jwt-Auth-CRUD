var validate = function (decoded, req, callback) {
    
        // do your checks to see if the person is valid
       console.log("decode",decoded)
       req.activatedUserEmail= decoded.email;
       callback(null,true)
       
    };
    module.exports = validate;
    