const Sequelize = require('sequelize');
const {v4: uuidv4} = require('uuid')

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable("botFiles", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
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
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('botFiles')
  }
};
