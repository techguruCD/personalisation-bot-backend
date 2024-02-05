const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs')
const {v4: uuidv4} = require('uuid')

const migrationCommands = function (transaction) {
  return [{
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          "type": Sequelize.UUID,
          "primaryKey": true,
          "defaultValue": Sequelize.UUIDV4
        },
        name: {
          "type": Sequelize.STRING,
          "allowNull": false
        },
        email: {
          "type": Sequelize.STRING,
          "unique": true,
          "allowNull": false
        },
        password: {
          "type": Sequelize.STRING,
          "allowNull": true
        },
        role: {
          type: Sequelize.ENUM('ADMIN', 'USER'),
          allowNull: false,
          defaultValue: 'USER'
        },
        createdAt: {
          "type": Sequelize.DATE,
          "allowNull": false,
          "defaultValue": Sequelize.NOW
        },
        updatedAt: {
          "type": Sequelize.DATE,
          "allowNull": false,
          "defaultValue": Sequelize.NOW
        }
      },
      {
        "transaction": transaction
      }
    ]
  },
  {
    fn: "addIndex",
    params: [
      "users",
      ["email"],
      {
        "indexName": "users_email",
        "name": "users_email",
        "indicesType": "UNIQUE",
        "type": "UNIQUE",
        "transaction": transaction
      }
    ]
  }
  ];
};
const rollbackCommands = function (transaction) {
  return [{
    fn: "dropTable",
    params: ["users", {
      transaction: transaction
    }]
  }
  ];
};

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
    await this.execute(queryInterface, Sequelize, migrationCommands);
    queryInterface.bulkInsert('users', [{
      id: uuidv4(),
      name: 'admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('1234567890', 8),
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  }
};
