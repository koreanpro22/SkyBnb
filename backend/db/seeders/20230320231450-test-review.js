'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'description 1',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'description 2',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'description 3',
        stars: 3
      },
      {
        spotId: 4,
        userId: 3,
        review: 'description 4',
        stars: 1
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4]}
    }, {})
  }
};
