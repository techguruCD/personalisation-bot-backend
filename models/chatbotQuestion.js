module.exports = (sequelize, Sequelize) => {
    const ChatbotQuestion = sequelize.define("chatbotquestions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
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
    });
    return ChatbotQuestion
  }