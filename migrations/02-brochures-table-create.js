const Sequelize = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable("brochures", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      segment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      charachteristics: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.bulkInsert('brochures', [
      {
        id: uuidv4(),
        number: 0,
        segment: 'Unpersonalised',
        charachteristics: "Unpersonalised",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        number: 1,
        segment: 'Quality Seeker',
        charachteristics: 'Prioritizes a balance between price and convenience.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        number: 2,
        segment: 'Strategic Saver',
        charachteristics: 'A comparison shopper keen on finding maximum savings.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        number: 3,
        segment: 'Habitual Sprinter',
        charachteristics: 'Brand loyal and knows exactly what they want.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        number: 4,
        segment: 'Dollar Defaulter',
        charachteristics: 'Driven by the quest for the cheapest deals.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        number: 5,
        segment: 'Passionate Explorer',
        charachteristics: 'Enjoys the online shopping experience and discovering new trends.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        number: 6,
        segment: 'Opportunistic Adventurer',
        charachteristics: 'Opportunistic Adventurer: Treats online shopping like a game, always on the lookout for promotions​​.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('brochures')
  }
};
