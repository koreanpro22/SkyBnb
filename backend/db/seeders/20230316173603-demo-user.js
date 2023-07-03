'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'test1',
        lastName: 'test1',
        email: 'test1@user.io',
        username: 'test1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'test2',
        lastName: 'test2',
        email: 'test2@user.io',
        username: 'test2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'test3',
        lastName: 'test3',
        email: 'test3@user.io',
        username: 'test3',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'test4',
        lastName: 'test4',
        email: 'test4@user.io',
        username: 'test4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'test5',
        lastName: 'test5',
        email: 'test5@user.io',
        username: 'test5',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'test6',
        lastName: 'test6',
        email: 'test6@user.io',
        username: 'test6',
        hashedPassword: bcrypt.hashSync('password6')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['test1','test2','test3','test4','test5','test6'] }
    }, {});
  }
};
