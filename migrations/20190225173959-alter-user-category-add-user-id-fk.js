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
  return db.addForeignKey('user_category',
  'user',
  'user_category_user_id_fk',
  {'user_id':'user_id'},
  {
    onDelete: 'CASCADE',
    onUpdate: 'RESTRICT'
  }
  )
};

exports.down = function(db) {
  return db.removeForeignKey('user_category', 'user_category_user_id_fk');
};d

exports._meta = {
  "version": 1
};
