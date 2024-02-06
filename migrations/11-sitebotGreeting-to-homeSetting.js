const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'homeSettings', 
      'sitebotGreeting',
      {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: `Hi. I'm a chatbot which knows all about this site. How can I assist you?`
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('homeSettings', 'sitebotGreeting')
  },
};
