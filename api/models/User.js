/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: { //added
      type: 'string',
      unique: true, //no same username
      required: true//needed when unique is used
    },
    password:
      { type: 'string' },
    role: {
      type: 'string',
      //enum: ['admin', 'tester', 'visitor'],
      isIn: ['admin', 'tester', 'visitor'],
      defaultsTo: 'visitor'
    },
    supervises: {
      collection: 'Person',
      via: 'worksFor'
    },
  },

  customToJSON: function () {
    // Return a shallow copy of this record with the password removed.
    return _.omit(this, ['password'])
  },
};

