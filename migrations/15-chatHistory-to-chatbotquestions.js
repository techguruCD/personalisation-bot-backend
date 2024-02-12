const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'chatbotquestions', 
      'chatHistory',
      {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('chatbotquestions', 'chatHistory')
  },
};
