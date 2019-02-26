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
  return db.addColumn('product', 'product_details', {
    type: 'text'
  }, function(err) {
    if (err) return callback(err);
  });
};

exports.down = function(db, callback) {
  return db.removeColumn('product','product_details',function(err) {
    console.log('Could not rollback! error: ', err);
  });
};

exports._meta = {
  "version": 1
};
