'use strict';

var UserCat = require('../model/UserCategory.js');

exports.list_user_categories = function(req, res) {
    UserCat.getUserCategories(req.params.userId, function(err, userCat) {
    if (err) {
      res.send(err);
    } else {
      res.send(userCat);
    }
  });
};


exports.add_user_category = function(req, res) {
    UserCat.insertUserCategory(new UserCat(req.body), function(err, userCat) {
    if (err) {
      res.send(err);
    } else {
      res.json(userCat);
    }
  });
};


exports.delete_user_category = function(req, res) {
  UserCat.remove(req, function(err, userCat) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'User Category successfully deleted' });
    }
  });
};

