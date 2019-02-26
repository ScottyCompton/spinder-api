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
  db.createTable('user', {
    user_id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: 'string',
      length: 50,
    },
    last_name: {
      type: 'string',
      length:50,
    },
    email: {
      type:  'string',
      length:50,
    },
    bill_name: {
      type: 'string',
      length:50
    },
    bill_addr1: {
      type:'string',
      length:50,
    },
    bill_addr2: {
      type:'string',
      length:50,
    },
    bill_city: {
      type:'string',
      length:50
    },
    bill_state_id: {
      type: 'int'
    },
    bill_zip: {
      type: 'string',
      length: 20
    },
    ship_name: {
      type: 'string',
      length:50
    },
    ship_addr1: {
      type:'string',
      length:50,
    },
    ship_addr2: {
      type:'string',
      length:50,
    },
    ship_city: {
      type:'string',
      length:50
    },
    ship_state_id: {
      type: 'int'
    },
    ship_zip: {
      type: 'string',
      length: 20
    }
  }, function(err) {
    if (err) return callback(err);
    return callback();
  })
};

exports.down = function(db) {
  db.dropTable('user');
};

exports._meta = {
  "version": 1
};
