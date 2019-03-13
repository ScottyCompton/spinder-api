"use strict";
require("dotenv").config();
var sql = require("./db.js");

//Product object constructor
var Product = function(data){
    this.data = data;
};

// get a random product for the userId
Product.getRandomProduct = function getRandomProduct(userId, result) {
    var sqlStr = "SELECT DISTINCT a.* FROM product a "
    + " INNER JOIN product_category b ON b.product_id = a.product_id "
    + " INNER JOIN user_category c ON c.category_id = b.category_id "
    + " WHERE c.user_id= ? "

    // get only products that the user hasn"t seen before
    if(process.env.APP_HIDESEENPRODS === "1") {
        sqlStr += " AND a.product_id NOT IN (SELECT c.product_id from seen_product c WHERE c.user_id = ?)";
    }

    sqlStr += " ORDER BY RAND() LIMIT 1";
    
    sql.query(sqlStr, [userId, userId], function(err, res) {
        if(err) {
            result(err, null);
        } else {
            // hide from the use if this flag is set in the app
            if(!process.env.APP_HIDESEENPRODS === "1") {
                insertUserSeenProduct(userId, res[0].product_id);
            }
            result(null,res);
        }
    });
}


Product.getMultipleRandomProducts = function getMultipleRandomProducts(postData, result) {
    var userId = postData.user_id;
    var productCount = postData.product_count;

    var sqlStr = "SELECT DISTINCT a.* FROM product a "
    + " INNER JOIN product_category b ON b.product_id = a.product_id "
    + " INNER JOIN user_category c ON c.category_id = b.category_id "
    + " WHERE c.user_id= ? "

    // get only products that the user hasn"t seen before
    if(process.env.APP_HIDESEENPRODS === "1") {
        sqlStr += " AND a.product_id NOT IN (SELECT c.product_id from seen_product c WHERE c.user_id = ?)";
    }

    sqlStr += " ORDER BY RAND() LIMIT ?";
    
    sql.query(sqlStr, [userId, userId, productCount], async function(err, res) {
        if(err) {
            result(err, null);
        } else {
            // hide from the use if this flag is set in the app
            if(!process.env.APP_HIDESEENPRODS === "1") {
                insertUserSeenProduct(userId, res[0].product_id);
            }
    
            // Get the list of images thru promisify
            const getImages = function(item) {
                return new Promise( function(resolve, reject) {
                    sql.query("Select * from product_image WHERE product_id = ? ", item.product_id, function (err, res2) {
                        if(err) {
                            console.log("error: ", err);
                            reject(result(null, err));
                        }
                        else {
                            item.product_images = res2;
    
                            resolve(item);
                        }
                    });
                });
            };
    
            let products = [];
    
            const returnFalse = () => false;
    
            for (let i = 0; i < res.length; i++ ) {
                let product = await getImages(res[i]).catch(returnFalse);
    
                if (product) {
                    products.push(product);
                }
            }
    
            result( null, products);
        }
    }); 

}



// get a random product for the userId
/*
Product.getMultipleRandomProducts = function getMultipleRandomProducts(postData, result) {
    var userId = postData.user_id;
    var productCount = postData.product_count;

    var sqlStr = "SELECT DISTINCT a.* FROM product a "
    + " INNER JOIN product_category b ON b.product_id = a.product_id "
    + " INNER JOIN user_category c ON c.category_id = b.category_id "
    + " WHERE c.user_id= ? "

    // get only products that the user hasn"t seen before
    if(process.env.APP_HIDESEENPRODS === "1") {
        sqlStr += " AND a.product_id NOT IN (SELECT c.product_id from seen_product c WHERE c.user_id = ?)";
    }

    sqlStr += " ORDER BY RAND() LIMIT ?";
    
    sql.query(sqlStr, [userId, userId, productCount], function(err, res) {
        if(err) {
            result(err, null);
        } else {
            // hide from the use if this flag is set in the app
            if(!process.env.APP_HIDESEENPRODS === "1") {
                insertUserSeenProduct(userId, res[0].product_id);
            }
            result(null,res);
        }
    });
}

*/


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

        sql.query("INSERT INTO product SET ?", newProduct.data, function (err, res, fields) {
                
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


Product.updateProduct = function(productId, product, result){
  sql.query("UPDATE product SET ? WHERE product_id = ?", [product.data, productId], function (err, res, fields) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
          } else {   
             result(null, res);
          }
    }); 
};

Product.remove = function(productId, result){
     sql.query("DELETE FROM product WHERE product_id = ?", productId, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            }); 
};

function insertUserSeenProduct(userId, productId) {
    sql.query("INSERT into seen_product (product_id,user_id) values (?, ?)", [productId,userId], function(err,res) {
        if(err) {
            console.log("error: ", err);
        } 
    });
}


module.exports= Product;
