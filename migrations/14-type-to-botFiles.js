const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'botFiles', 
      'type',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'sitewidebot'
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('botFiles', 'type')
  },
};
