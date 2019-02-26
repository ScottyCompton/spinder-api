'use strict';

var Category = require('../model/Category.js');

exports.list_all_categories = function(req, res) {
  Category.getAllCategories(function(err, category) {
    if (err)
      res.send(err);
      console.log('res', category);
    res.send(category);
  });
};


exports.get_category = function(req, res) {
  Category.getCategoryById(req.params.categoryId, function(err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};



exports.create_category = function(req, res) {
  var new_category = new Category(req.body);
  
      Category.createCategory(new_category, function(err, category) {  
        if (err)
          res.send(err);
        res.json(category);
      });
  
};



exports.update_category = function(req, res) {
  Category.updateById(req.params.categoryId, new Category(req.body), function(err, category) {
    if (err)
      res.send(err);
    res.json(category);
  });
};


exports.delete_category = function(req, res) {
  Category.remove( req.params.categoryId, function(err, category) {
    if (err)
      res.send(err);
    res.json({ message: 'Category successfully deleted' });
  });
};

