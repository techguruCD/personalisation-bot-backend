const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'homeSettings', 
      'widgetbotIndex',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    await queryInterface.addColumn(
      'homeSettings', 
      'sitewidebotIndex',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('homeSettings', 'widgetbotIndex')
    await queryInterface.removeColumn('homeSettings', 'sitewidebotIndex')
  },
};
