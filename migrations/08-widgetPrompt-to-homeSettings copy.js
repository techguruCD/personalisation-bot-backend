const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'homeSettings', 
      'greeting',
      {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: `Hi, I am WidgetBot - A Chatbot trained to have answers for you about widgets. Feel free to ask me anything about widgets. I can also provide you a brochure - Just ask!`
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('homeSettings', 'greeting')
  },
};
