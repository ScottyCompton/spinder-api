'user strict';
var sql = require('./db.js');

//User object constructor
var User = function(data){
    this.data = data;
};


User.listAllUsers = function listAllUsers(result) {
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

        sql.query("INSERT INTO user SET ?", newUser.data, function (err, res, fields) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.insertId);
                }
            });           
};



User.getUser = function getUser(userId, result) {
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


User.updateUser = function(user, result) {
  var userId = user.user_id;
  delete user.user_id;

  sql.query("UPDATE user SET ? WHERE user_id = ?", [user.data, userId], function (err, res, fields) {
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
