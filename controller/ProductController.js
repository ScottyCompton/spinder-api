'use strict';

var Product = require('../model/Product.js');

exports.list_all_products = function(req, res) {
  Product.getAllProducts(function(err, product) {
    if (err)
      res.send(err);
      console.log('res', product);
    res.send(product);
  });
};



exports.get_product = function(req, res) {
  Product.getProductById(req.params.productId, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};



exports.create_product = function(req, res) {
  var new_product = new Product(req.body);
  
      Product.createProduct(new_product, function(err, product) {  
        if (err)
          res.send(err);
        res.json(product);
      });
  
};



exports.update_product = function(req, res) {
  Product.updateById(req.params.productId, new Product(req.body), function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};


exports.delete_product = function(req, res) {
  Product.remove( req.params.productId, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};

