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

exports.up = function(db) {
  return db.changeColumn('product_category', 'category_id', {type: 'int', length: 11});
};

exports.down = function(db) {
  return db.changeColumn('product_category', 'category_id', {type: 'int', length: 10});
};

exports._meta = {
  "version": 1
};
