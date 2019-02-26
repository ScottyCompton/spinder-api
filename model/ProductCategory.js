'use strict';
var sql = require('./db.js');

//ProdCat object constructor
var ProdCat = function(productCat){
    this.productCat = productCat;
    this.status = productCat.status;
};

// get all product categories, return null if the product_id
// isn't present to act as a selected/not selected flag
ProdCat.getProdCategories = function getProdCategories(productId, result) {
    sql.query("SELECT a.*,b.product_id from category a LEFT OUTER JOIN product_category b ON b.category_id=a.category_id and b.product_id= ? ", productId, function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
             result(null, res);
            }
        });   
};


ProdCat.insertProductCategory = function insertProductCategory(newProdCat, result) {

        sql.query("INSERT INTO product_category SET ?", newProdCat.productCat, function (err, res, fields) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.insertId);
                }
            });           
};



ProdCat.remove = function(req, result){
     sql.query("DELETE FROM product_category WHERE product_id = ? AND category_id=?", [req.params.productId,req.params.categoryId], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            }); 
};



module.exports= ProdCat;
