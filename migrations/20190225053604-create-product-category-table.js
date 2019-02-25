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
  db.createTable('product_category', {
    product_category_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: 'int',
      unsigned: true,
      length: 10,
      notNull: true,
    },
    category_id: {
      type: 'int',
      unsigned: true,
      length: 10,
      notNull: true,
    },
  }, function(err) {
    if (err) return callback(err);
    return callback();
  })
};

exports.down = function(db) {
  db.dropTable('product_category',callback);
};

exports._meta = {
  "version": 1
};
