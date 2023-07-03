'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviewimages';
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 3,
        url: 'https://www.reddit.com/r/ProgrammerHumor/',
      },
      {
        reviewId: 1,
        url: 'https://www.youtube.com/'
      },
      {
        reviewId: 4,
        url: 'https://www.google.com/'
      },
      {
        reviewId: 2,
        url: 'https://jwt.io/'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviewimages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
