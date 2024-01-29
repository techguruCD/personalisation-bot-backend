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
    await queryInterface.createTable("brochures", {
      id: {
        "type": Sequelize.UUID,
        "primaryKey": true,
        "defaultValue": Sequelize.UUIDV4
      },
      title: {
        "type": Sequelize.STRING,
        "allowNull": false
      },
      content: {
        "type": Sequelize.TEXT,
        "allowNull": false,
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
  },
  down: async function (queryInterface, Sequelize) {
    await queryInterface.dropTable('brochures')
  }
};
