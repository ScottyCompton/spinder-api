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
  db.createTable('product_image', {
    product_image_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: 'int',
      unsigned: true,
      notNull: true
    },
    product_image: {
      type: 'string',
      length: 255
    },
    create_date: {
      type: 'timestamp'
    }
  }, function(err) {
    if (err) return callback(err);
    return callback();
  })
};

exports.down = function(db) {
  return db.dropTable('product_image');
};

exports._meta = {
  "version": 1
};
