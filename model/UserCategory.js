'use strict';
var sql = require('./db.js');

//UserCat object constructor
var UserCat = function(data){
    this.data = data;
};

// get all product categories, return null if the user_id
// isn't present to act as a selected/not selected flag
UserCat.getUserCategories = function getUserCategories(userId, result) {
    sql.query("SELECT a.*,b.user_id from category a LEFT OUTER JOIN user_category b ON b.category_id=a.category_id and b.user_id= ? ", userId, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
             result(null, res);
            }
        });   
};


UserCat.insertUserCategory = function insertUserCategory(newUserCat, result) {

        sql.query("INSERT INTO user_category SET ?", newUserCat.data, function (err, res, fields) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.insertId);
                }
            });           
};



UserCat.remove = function(req, result){
     sql.query("DELETE FROM user_category WHERE user_id = ? AND category_id=?", [req.params.userId,req.params.categoryId], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            }); 
};



module.exports= UserCat;
