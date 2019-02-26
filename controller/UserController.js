'use strict';

var User = require('../model/User.js');

exports.list_all_users = function(req, res) {
  User.getAllUsers(function(err, user) {
    if (err)
      res.send(err);
      console.log('res', user);
    res.send(user);
  });
};



exports.get_user = function(req, res) {
  User.getUserById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};



exports.create_user = function(req, res) {
  var new_user = new User(req.body);
  
      User.createUser(new_user, function(err, user) {  
        if (err)
          res.send(err);
        res.json(user);
      });
  
};



exports.update_user = function(req, res) {
  User.updateById(req.params.userId, new User(req.body), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_user = function(req, res) {
  User.remove( req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

