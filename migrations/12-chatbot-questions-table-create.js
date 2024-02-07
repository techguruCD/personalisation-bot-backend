const Sequelize = require('sequelize');

const migrationCommands = function (transaction) {
  return [{
    fn: "createTable",
    params: [
      "chatbotquestions",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4
        },
        question: {
          type: Sequelize.TEXT,
          field: "question",
          allowNull: false
        },
        answer: {
          type: Sequelize.TEXT,
          field: "answer",
          allowNull: false
        },
        chatbotIndex: {
          type: Sequelize.INTEGER,
          field: "chatbotIndex",
          allowNull: false
        },
        segment: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        percentage: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        rationale: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: null
        },
        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false
        }
      },
      {
        "transaction": transaction
      }
    ]
  }
  ];
};
const rollbackCommands = function (transaction) {
  return [{
    fn: "dropTable",
    params: ["chatbotquestions", {
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
  up: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, migrationCommands);
  },
  down: function (queryInterface, Sequelize) {
    return this.execute(queryInterface, Sequelize, rollbackCommands);
  },
};
