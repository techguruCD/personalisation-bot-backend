const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'homeSettings', 
      'segmentLabel1',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Segment'
      })
    await queryInterface.addColumn(
      'homeSettings', 
      'segmentLabel2',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Chance%'
      })
    await queryInterface.addColumn(
      'homeSettings', 
      'segmentLabel3',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Rationale'
      })
    await queryInterface.addColumn(
      'homeSettings', 
      'segmentLabel4',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Brochure'
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('homeSettings', 'segmentLabel1')
    await queryInterface.removeColumn('homeSettings', 'segmentLabel2')
    await queryInterface.removeColumn('homeSettings', 'segmentLabel3')
    await queryInterface.removeColumn('homeSettings', 'segmentLabel4')
  },
};
