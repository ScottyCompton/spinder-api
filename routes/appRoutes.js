'use strict';
module.exports = function(app) {
  var users = require('../controller/UserController.js');
  var products = require('../controller/ProductController.js');
  var categories = require('../controller/CategoryController.js');
  var usercats = require('../controller/UserCategoryController.js');
  var prodcats = require('../controller/ProductCategoryController');

  // User Routes
  app.route('/users')
    .get(users.list_all_users);

   app.route('/user/:userId')
   .post(users.create_user)
   .get(users.get_user)
   .put(users.update_user)
   .delete(users.delete_user);

   // Category Routes
   app.route('/categories')
   .get(categories.list_all_categories);

   app.route('/category/:categoryId')
   .post(categories.create_category)
   .get(categories.get_category)
   .put(categories.update_category)
   .delete(categories.delete_category);

   // User Categories
   app.route('/usercategories/:userId')
   .get(usercats.list_user_categories);

   app.route('/usercategory')
   .delete(usercats.delete_user_category)
   .post(usercats.add_user_category);


   // Product Categories
   app.route('/productcategories/:productId')
   .get(prodcats.list_product_categories);

   app.route('/productcategory')
   .delete(prodcats.delete_product_category)
   .post(prodcats.add_product_category);


    // Product Routes
    app.route('/products')
    .get(products.list_all_products);
 
    app.route('/product/:productId')
    .post(products.create_product)
    .get(products.get_product)
    .put(products.update_product)
    .delete(products.delete_product);
 
};