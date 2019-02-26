'user strict';
var sql = require('./db.js');

//User object constructor
var User = function(user){
    this.user = user;
    this.status = user.status;
};


User.getAllUsers = function getAllUsers(result) {
    sql.query("Select * from user", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
             result(null, res);
            }
        });   
};


User.createUser = function createUser(newUser, result) {

        sql.query("INSERT INTO user SET ?", newUser.user, function (err, res, fields) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.insertId);
                }
            });           
};



User.getUserById = function getUserById(userId, result) {
        sql.query("Select * from user where user_id = ? ", userId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};


User.updateById = function(userId, user, result){
  sql.query("UPDATE user SET ? WHERE user_id = ?", [user.user, userId], function (err, res, fields) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
          } else {   
             result(null, res);
          }
    }); 
};

User.remove = function(userId, result){
     sql.query("DELETE FROM user WHERE user_id = ?", [userId], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            }); 
};



module.exports= User;
