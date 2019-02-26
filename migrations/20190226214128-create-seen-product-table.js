'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.createTable('seen_product', {
    user_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: 'int',
      length: 11,
    },
    user_id: {
      type: 'int',
      length:11,
    }
  }, function(err) {
    if (err) return callback(err);
    return callback();
  })
};

exports.down = function(db, callback) {
  return db.dropTable('seen_product', 
  function(err) {
    if (err) return callback(err);
  });
};

exports._meta = {
  "version": 1
};
