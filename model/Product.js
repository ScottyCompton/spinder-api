'use strict';
var sql = require('./db.js');

//Product object constructor
var Product = function(product){
    this.product = product;
    this.status = product.status;
};


Product.getAllProducts = function getAllProducts(result) {
    sql.query("Select * from product", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
             result(null, res);
            }
        });   
};


Product.createProduct = function createProduct(newProduct, result) {

        sql.query("INSERT INTO product SET ?", newProduct.product, function (err, res, fields) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    result(null, res.insertId);
                }
            });           
};



Product.getProductById = function getProductById(productId, result) {
        sql.query("Select * from product where product_id = ? ", productId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });   
};


Product.updateById = function(productId, product, result){
  sql.query("UPDATE product SET ? WHERE product_id = ?", [product.product, productId], function (err, res, fields) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
          } else {   
             result(null, res);
          }
    }); 
};

Product.remove = function(productId, result){
     sql.query("DELETE FROM product WHERE product_id = ?", [productId], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            }); 
};



module.exports= Product;
