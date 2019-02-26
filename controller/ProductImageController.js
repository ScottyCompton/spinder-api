'use strict';

var ProductImage = require('../model/ProductImage.js');

exports.list_all_prouct_images = function(req,res) {
    ProductImage.getAllProductImages(req.params.productId, function(err,productImages) {
        if(err) {
            res.send(err);
        } else {
            res.send(productImages)
        }
    });
}

exports.get_product_cover_image = function(req,res) {
    ProductImage.getProductCoverImage(req.params.productId, function(err, productImage) {
        if(err) {
            res.send(err);
        } else {
            res.send(productImage);
        }
    });
}

exports.create_product_image = function(req,res) {
    ProductImage.insertProductImage(new ProductImage(req.body), function(err, productImage) {
        if (err){
            res.send(err);
          } else {
            res.json(productImage);
          }
    });
}

exports.get_product_image = function(req,res){
    ProductImage.getProductImage(req.params.productImageId, function(err, productImage) {
        if(err) { 
            res.send(err);
        } else {
            res.json(productImage);
        }
    })
}

exports.delete_product_image = function(req,res) {
    ProductImage.removeProductImage(req, function(err,res) {
        if(err) {
            res.send(err);
        } else {
            res.send("Product Image successfully deleted");
        }
    });
}