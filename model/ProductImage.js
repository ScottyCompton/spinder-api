'use strict';
var sql = require('./db.js');

//ProductImage object constructor
var ProductImage = function(data){
    this.data = data;
};

 // this is what I pass as handleResult to getAllProductImages
function addProductImagesToProduct(err, productImages) { 
    if(err)
    productObj.product_images = productImages;
    productArray.push(productObj);
}



ProductImage.getAllProductImages = function getAllProductImages(productId, result) {
    sql.query("Select * from product_image WHERE product_id = ? ", productId, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else {
                result(null, res);
            }
        });   
};


ProductImage.getProductCoverImage = function(productId, result) {
    sql.query("SELECT * FROM product_image WHERE product_id = ? LIMIT 1", productId, function(err,res) {
        if(err) {
            console.log("error: ", err);
            result(null,err);
        } else {
            result(null,res);
        }
    });
}



ProductImage.insertProductImage = function insertProductImage(newProductImage, result) {

    sql.query("INSERT INTO product_image SET ?", newProductImage.data, function (err, res, fields) {
            
            if(err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res.insertId);
            }
        });           
};


ProductImage.getProductImage = function getProductImage(productImageId, result) {
    sql.query("SELECT * from product_image WHERE product_image_id = ?", productImageId, function(err, res) {
        if(err) {
            console.log("error: ", err);
            result(err,null)
        } else {
            result(null, res);
        }
    });
}

ProductImage.removeProductImage = function removeProductImage(req, result) {
    sql.query("DELETE FROM product_image where product_image_id = ?", req.params.productImageId, function(err,res) {
        if(err) {
            console.log("error: ", err);
            result(err, null)
        } else {
            result(null, res);
        }
    })
}

module.exports= ProductImage;
