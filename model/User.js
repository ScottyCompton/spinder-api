'user strict';
var sql = require('./db.js');
var bcrypt = require('bcrypt');
require('dotenv').config();

//User object constructor
var User = function(data){
    this.data = data;
};


User.listAllUsers = function listAllUsers(result) {
    sql.query("Select * from user", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(err, null);
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




User.updatePassword = function(user,result) {
    var data = user.data;
    var userId = data.userId;

    var password = encryptPassword(data.password);


    sql.query("UPDATE user SET password = ? where user_id = ?", [password, userId], function(err, res, fields) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
        } else {   
           result(null, res);
        }       
    });
}



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


User.validateLogin = function(loginData, result) {
    var email = loginData.data.email;
    var password = loginData.data.password;
    // validates the user's email, retrives the stored password
    sql.query("SELECT user_id, email, first_name, password from user where email = ?", [email], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            if(res[0] === undefined) {
                result({errors: "Email Not Found"}, null);
            } else {
                var hash = res[0].password;
                bcrypt.compare(password, hash, function(err, isFound) {
                    if(err) {
                        result(err, null)
                    } else {
                        if(isFound) {
                            result(null, res)
                        } else {
                            result(null, {errors: "Password Incorrect"});
                        }
                    }
                });
            }
        }
    });
}


User.getUser = function getUser(userId, result) {
    sql.query("Select * from user where user_id = ? ", userId, function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });   
};



const encryptPassword = function(pwd) {
    return bcrypt.hashSync(pwd, bcrypt.genSaltSync(Number.parseInt(process.env.APP_SALTROUNDS)), null);
}

module.exports= User;
