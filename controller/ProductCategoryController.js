'use strict';

var ProductCat = require('../model/ProductCategory.js');

exports.list_product_categories = function(req, res) {
    ProductCat.getProductCategories(req.params.productId, function(err, productCat) {
    if (err) {
      res.send(err);
    } else {
      res.send(productCat);
    }
  });
};


exports.add_product_category = function(req, res) {
    ProductCat.insertProductCategory(new ProductCat(req.body), function(err, productCat) {
    if (err){
      res.send(err);
    } else {
      res.json(productCat);
    }
  });
};


exports.delete_product_category = function(req, res) {
  ProductCat.remove(req, function(err, productCat) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Product Category successfully deleted' });
    }
  });
};

