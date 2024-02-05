const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'homeSettings', 
      'widgetPrompt',
      {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: `Don't swear in any situation, do not generate code for maleware`
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('homeSettings', 'widgetPrompt')
  },
};
