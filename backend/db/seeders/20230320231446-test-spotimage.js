'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spotimages';
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/5ef5da3f-5339-4ba3-b2d8-46f585a52477.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/5e0e55aa-ab55-4200-b37f-b74cacde8678.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/e35bf897-f3e4-476e-9c7d-e7c8040faef5.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/830d8116-096a-4d52-a216-f1ca392989f2.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/72d72696-7d76-4581-b304-ca9f6e3c359c.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/b0e1c499-9cc9-4e26-b9d1-6b00931f7853.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-28427579/original/ce7963e2-4141-47e5-a930-75cb9a892ef4.jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/13bc14bb-cc9e-4486-9022-ce0debfcf877.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/e727f139-c365-4729-9355-adc9c74fb8e4.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/bafe338d-e186-42ca-9d57-88f6f15e7de1.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/d65c3b20-ffbd-44cc-a14f-355f4e3f8ca6.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/5eb2a2a7-80e7-453e-81d9-85e8e0e83804.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/1ed2495c-aff4-444e-a11d-d9888d709a53.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/a0f8956e-0063-4ad5-99c9-03e944ffdca0.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/9bb49e0d-517c-40f2-8518-b85338fe6b52.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/1772054d-d9d4-4d56-9ead-f32618846406.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/4cbdfb4d-943e-4a16-87ff-331863f5af14.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/ca5ef84a-861c-49ce-a99e-111a3e42691b.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/2a2bd004-5e73-4485-af22-3fee6ca8d87d.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-824494434891127912/original/6e2417f7-0403-46c8-bfbc-ffdfaf391089.jpeg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-824494434891127912/original/3c6d1835-2ea5-4775-b8b7-531bd1bec7d8.jpeg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-824494434891127912/original/073cbe18-db3a-4c3e-b95d-b56c0d88f087.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-762396383662572796/original/0eff1113-59b3-4ea4-967a-977db54a103e.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-762396383662572796/original/4fce386c-b4de-4929-890e-d867fd984a11.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-762396383662572796/original/6f56a424-08cf-420d-8bb5-f05423483214.jpeg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-762396383662572796/original/54a8c672-481d-416c-bc98-43c2e4a86647.jpeg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/179b8cfc-61fe-4b11-9f86-9fcedb42044d.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/3d719166-3319-4809-90f2-012fbbeebf7b.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/27053270-f1f7-4ac5-8cb7-b8ca5f517c17.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/b2030d2c-31bd-4c36-90ae-386783333392.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/c45eefee-df7b-43ab-b6d2-f803796027ac.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-634814874864128809/original/28dd2890-f73f-414d-a1d6-42f468f7a76e.jpeg',
        preview: false
      },
      // {
      //   spotId: 8,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      // {
      //   spotId: 8,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      {
        spotId: 9,
        url: 'https://s3-us-west-2.amazonaws.com/transparentcity/uploads/images/000/033/705/original/50-West-34th-Street-Lounge9.jpg',
        preview: true
      },
      // {
      //   spotId: 9,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      // {
      //   spotId: 9,
      //   url: 'https://www.google.com/',
      //   preview: false
      // },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52637868/original/cd218569-a9ca-4947-8cd5-edd5ebebbef6.jpeg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/71bee640-94e9-4500-9849-7b5df897c9d7.jpg',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/17a8404b-1a1d-4415-867a-d6e9d52f1764.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-52637868/original/48c92bb5-c80b-421e-b372-f24a2eda70a3.jpeg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/ee6ef5d3-6e7e-4639-83e9-3115839f2ca6.jpg',
        preview: false
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spotimages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4]}
    }, {});
  }
};
