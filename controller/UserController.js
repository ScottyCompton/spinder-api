'use strict';

var User = require('../model/User.js');

exports.list_all_users = function(req, res) {
  User.listAllUsers(function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
    
  });
};

exports.login_user = function(req, res) {
  var userData = new User(req.body);

  User.validateLogin(userData, function(err, returnData) {
    if (err) {
      res.send(err);
    } else {
      res.send(returnData);
    }
  });
 
}

exports.get_user = function(req, res) {
  User.getUser(req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};



exports.create_user = function(req, res) {
  var newUser = new User(req.body);
  
  User.createUser(newUser, function(err, user) {  
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
  
};


exports.update_password = function(req,res) {
  User.updatePassword(new User(req.body), function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }    
  });
}


exports.update_user = function(req, res) {
  User.updateUser(new User(req.body), function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  });
};


exports.delete_user = function(req, res) {
  User.remove( req.params.userId, function(err, user) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'User successfully deleted' });
    }
  });
};

