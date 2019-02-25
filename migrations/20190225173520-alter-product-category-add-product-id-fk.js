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
  return db.addForeignKey('product_category',
  'product',
  'product_category_product_id_fk',
  {'product_id':'product_id'},
  {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
  }
  )
};

exports.down = function(db) {
  return db.removeForeignKey('product_category', 'product_category_product_id_fk');
};

exports._meta = {
  "version": 1
};
