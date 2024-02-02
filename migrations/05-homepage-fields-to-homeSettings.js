const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  up: async function (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'homeSettings', 
      'chatbotTitle',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Widget Questions?'
      })
    await queryInterface.addColumn(
      'homeSettings', 
      'chatbotSubTitle',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Chat to Our Bot!'
      })
    await queryInterface.addColumn(
      'homeSettings', 
      'segmentTitle',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Behind the Scenes'
      })
    await queryInterface.addColumn(
      'homeSettings', 
      'segmentSubTitle',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Real Time Segmentation'
      })
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.removeColumn('homeSettings', 'chatbotTitle')
    await queryInterface.removeColumn('homeSettings', 'chatbotSubTitle')
    await queryInterface.removeColumn('homeSettings', 'segmentTitle')
    await queryInterface.removeColumn('homeSettings', 'segmentSubTitle')
  },
};
