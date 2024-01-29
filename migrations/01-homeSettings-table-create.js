const Sequelize = require('sequelize');

module.exports = {
  pos: 0,
  useTransaction: true,
  execute: function (queryInterface, Sequelize, _commands) {
    let index = this.pos;
    function run(transaction) {
      const commands = _commands(transaction);
      return new Promise(function (resolve, reject) {
        function next() {
          if (index < commands.length) {
            let command = commands[index];
            console.log("[#" + index + "] execute: " + command.fn);
            index++;
            queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
          }
          else
            resolve();
        }
        next();
      });
    }
    if (this.useTransaction) {
      return queryInterface.sequelize.transaction(run);
    } else {
      return run(null);
    }
  },
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable("homeSettings", {
      id: {
        "type": Sequelize.UUID,
        "primaryKey": true,
        "defaultValue": Sequelize.UUIDV4
      },
      mainTitle: {
        "type": Sequelize.STRING,
        "allowNull": false,
        defaultValue: 'The New Widget 2000'
      },
      subTitle: {
        "type": Sequelize.STRING,
        defaultValue: 'Get Your Brochure Below',
        "allowNull": false
      },
      text: {
        "type": Sequelize.STRING,
        "allowNull": true,
        defaultValue: `The wait is over. Now you can buy a Widget 2000 and have your widget dreams come true.`
      },
      prompt: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: `Don't swear in any situation, do not generate code for maleware`
      },
      createdAt: {
        "type": Sequelize.DATE,
        "allowNull": false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        "type": Sequelize.DATE,
        "allowNull": false,
        defaultValue: Sequelize.NOW
      }
    })
    await queryInterface.bulkInsert('homeSettings', [{
      id: '13dadf60-1436-4e49-a613-e446fddb4deb',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('homeSettings')
  }
};
