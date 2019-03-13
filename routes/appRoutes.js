'use strict';
module.exports = function(app) {
  // Load Controllers
  var users = require('../controller/UserController.js');
  var products = require('../controller/ProductController.js');
  var categories = require('../controller/CategoryController.js');
  var usercats = require('../controller/UserCategoryController.js');
  var prodcats = require('../controller/ProductCategoryController');
  var prodimgs = require('../controller/ProductImageController.js');

  // User Routes
  app.route('/users')
    .get(users.list_all_users);
  
  app.route('/user')
  .post(users.create_user)
  .put(users.update_user);
  
   app.route('/user/:userId')
   .get(users.get_user)
   .delete(users.delete_user);

   app.route('/validateuser/')
   .post(users.login_user);

   app.route('/updatepassword/')
   .post(users.update_password);

  /* TODO: Clean up all routes so 1) they don't require an id for an update, 
  and 2) conform to some kind of sane, logical, predictable convention */


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
   .post(usercats.add_user_category)
   .delete(usercats.delete_user_category);


   // Product Categories
   app.route('/productcategories/:productId')
   .get(prodcats.list_product_categories);

   app.route('/productcategory')
   .delete(prodcats.delete_product_category)
   .post(prodcats.add_product_category);


    // Product Routes
    app.route('/products')
    .get(products.list_all_products)
    .post(products.create_product);
  
    app.route('/product/:productId')
    .get(products.get_product)
    .put(products.update_product)
    .delete(products.delete_product);

    app.route('/randomproduct/:userId')
    .get(products.get_random_product);

    app.route('/multiplerandomproducts/')
    .post(products.get_multiple_random_products);
    
    

    // Product Images
    app.route('/productimages/:productId') // note productimages is PLURAL
    .get(prodimgs.list_all_prouct_images);
  
    app.route('/productimage/:productId')
    .get(prodimgs.get_product_cover_image);

    app.route('/productimage/')
    .post(prodimgs.create_product_image);

    app.route('/productimage/:productImageId')
    .get(prodimgs.get_product_image)
    .delete(prodimgs.delete_product_image);

};