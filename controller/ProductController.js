'use strict';

var Product = require('../model/Product.js');
var ProductImage = require('../model/ProductImage.js');

exports.list_all_products = function(req, res) {
  Product.getAllProducts(function(err, product) {
    if (err) {
      res.send(err);
    } else {
      console.log('res', product);
      res.send(product);
    }

  });
};



exports.get_product = function(req, res) {
  Product.getProductById(req.params.productId, function(err, product) {
    if (err) {
      res.send(err);
    } else {
      res.json(product);
    }
  });
};


exports.create_product = function(req, res) {
  var newProduct = new Product(req.body);
  
      Product.createProduct(newProduct, function(err, product) {  
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json(product);
        }
      });
  
};



exports.update_product = function(req, res) {
  Product.updateProduct(req.params.productId, new Product(req.body), function(err, product) {
    if (err) {
      res.send(err);
    } else {
      res.json(product);
    }
  });
};

// pull a random product based on the user's category selections

exports.get_random_product = function(req,res) {
  Product.getRandomProduct(req.params.userId, function(err,product) {
    if(err) {
      res.send(err); 
    } else {
      res.json(product);
    }
  });
}


exports.get_multiple_random_products = function(req,res) {
  var postData = new Product(req.body);
  Product.getMultipleRandomProducts(postData.data, function(err,products) {
    if(err) {
      res.send(err); 
    } else {
      res.json(products);
    }
  });
}



exports.delete_product = function(req, res) {
  Product.remove( req.params.productId, function(err, product) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Product successfully deleted' });
    }
  });
};

