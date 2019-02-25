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
  db.createTable('category', {
    category_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    categoy_name: {
      type: 'string',
      length: 50,
    },
    category_img: {
      type: 'string',
      length:50,
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
  db.dropTable('category',callback);
};

exports._meta = {
  "version": 1
};
