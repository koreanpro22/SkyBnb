'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '106 Wright Dr',
        city: 'North Utica',
        state: 'Illinois',
        country: 'USA',
        lat: 41.345010,
        lng: -89.021740,
        name: 'house1',
        description: 'Amzazing House',
        price: 175
      },
      {
        ownerId: 1,
        address: '407 W Church St',
        city: 'Marshalltown',
        state: 'Iowa',
        country: 'USA',
        lat: 42.048130,
        lng: -92.920300,
        name: 'house2',
        description: 'Cozy house',
        price: 150
      },
      {
        ownerId: 2,
        address: '2900 Quincy Ln',
        city: 'Lansing',
        state: 'Michigan',
        country: 'USA',
        lat: 42.704140,
        lng: -84.581270,
        name: 'house3',
        description: 'Nice small house w/ garage',
        price: 160
      },
      {
        ownerId: 2,
        address: '610 Jenne St',
        city: 'Grand Ledge',
        state: 'Michigan',
        country: 'USA',
        lat: 42.750860,
        lng: -84.750050,
        name: 'house4',
        description: 'Big house 6 rooms',
        price: 300
      },
      {
        ownerId: 3,
        address: '2508 Ware Rd',
        city: 'Austin',
        state: 'Texas',
        country: 'USA',
        lat: 30.224870,
        lng: -97.732490,
        name: 'house5',
        description: 'Low house',
        price: 135
      },
      {
        ownerId: 3,
        address: '603 E 12th St',
        city: 'Houston',
        state: 'Texas',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'house6',
        description: 'nice green house',
        price: 190
      },
      {
        ownerId: 4,
        address: '201 S Cooper Pl',
        city: 'Tampa',
        state: 'Florida',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'house7',
        description: 'Very close to the beach!',
        price: 240
      },
      {
        ownerId: 4,
        address: '629 W South St',
        city: 'Oralando',
        state: 'Florida',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'house8',
        description: 'Big 8 room house',
        price: 300
      },
      {
        ownerId: 5,
        address: '50 W 34th St',
        city: 'New York City',
        state: 'NY',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'house9',
        description: 'Right in the middle of manhattan',
        price: 350
      },
      {
        ownerId: 6,
        address: '153 E 12th St, Long Beach, CA 90813',
        city: 'Long Beach',
        state: 'California',
        country: 'USA',
        lat: null,
        lng: null,
        name: 'house10',
        description: 'House in Long Beach',
        price: 230
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {});
  }
};
