'use strict';
var sql = require('./db.js');

//UserCat object constructor
var UserCat = function(data){
    this.data = data;
};

// get all product categories, return null if the user_id
// isn't present to act as a selected/not selected flag
UserCat.getUserCategories = function getUserCategories(userId, result) {
    sql.query("SELECT DISTINCT a.*,b.user_id from category a LEFT OUTER JOIN user_category b ON b.category_id=a.category_id and b.user_id= ? ", userId, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
             result(null, res);
            }
        });   
};


UserCat.insertUserCategory = function insertUserCategory(userCat, result) {

        sql.query("INSERT INTO user_category SET ?", userCat.data, function (err, res, fields) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    var userCategoryId = res.insertId;
                    sql.query("SELECT DISTINCT a.*,b.user_id from category a LEFT OUTER JOIN user_category b ON b.category_id=a.category_id and b.user_id = ? WHERE b.user_category_id = ?", [userCat.data.user_id, userCategoryId], function (err, res2) {

                        if(err) {
                            console.log("error: ", err);
                            result(null, err);
                        }
                        else{
                         result(null, res2);
                        }
                    });                      
                }
            
            });           
};



UserCat.remove = function(userCat, result){
     sql.query("DELETE FROM user_category WHERE user_id = ? AND category_id = ?", [userCat.data.user_id, userCat.data.category_id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else {
                    sql.query("SELECT DISTINCT a.*,b.user_id from category a LEFT OUTER JOIN user_category b ON b.category_id=a.category_id and b.user_id = ? WHERE a.category_id = ?", [userCat.data.user_id, userCat.data.category_id], function (err, res2) {

                        if(err) {
                            console.log("error: ", err);
                            result(null, err);
                        }
                        else{
                         result(null, res2);
                        }
                    });                      
                }
            }); 
};



module.exports= UserCat;
