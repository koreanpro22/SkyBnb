'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-01-01',
        endDate: '2023-02-01'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-02-01',
        endDate: '2023-03-01'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2023-04-01',
        endDate: '2023-05-01'
      },
      {
        spotId: 4,
        userId: 2,
        startDate: '2023-02-01',
        endDate: '2023-03-01'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      startDate: {
        [Op.in]: ['2023-01-01', '2023-02-01', '2023-04-01']
      }
    }, {});
  }
};
