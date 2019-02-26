'use strict';
var sql = require('./db.js');

//Category object constructor
var Category = function(category){
    this.category = category;
    this.status = category.status;
};


Category.getAllCategories = function getAllCategories(result) {
    sql.query("Select * from category", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
             result(null, res);
            }
        });   
};


Category.createCategory = function createCategory(newCategory, result) {

        sql.query("INSERT INTO category SET ?", newCategory.category, function (err, res, fields) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.insertId);
                }
            });           
};



Category.getCategoryById = function getCategoryById(categoryId, result) {
        sql.query("Select * from category where category_id = ? ", categoryId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};


Category.updateById = function(categoryId, category, result){
  sql.query("UPDATE category SET ? WHERE category_id = ?", [category.category, categoryId], function (err, res, fields) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
          } else {   
             result(null, res);
          }
    }); 
};

Category.remove = function(categoryId, result){
     sql.query("DELETE FROM category WHERE category_id = ?", [categoryId], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            }); 
};



module.exports= Category;
