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
  db.createTable('product', {
    product_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: 'string',
      length: 100,
    },
    product_img: {
      type: 'string',
      length:50,
    },    
    product_desc: {
      type: 'string',
      length:255,
    },
    price: {
      type: 'float',
      defaultValue: 0
    },
    create_date: {
      type:  'timestamp'
    }
  }, function(err) {
    if (err) return callback(err);
    return callback();
  })
};

exports.down = function(db) {
  db.dropTable('product',callback);
};

exports._meta = {
  "version": 1
};
