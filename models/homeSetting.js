module.exports = (sequelize, Sequelize) => {
    const HomeSetting = sequelize.define('homeSettings', {
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
            "allowNull": false,
            defaultValue: `The wait is over. Now you can buy a Widget 2000 and have your widget dreams come true.`
        },
        chatbotTitle: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Widget Questions?`
        },
        chatbotSubTitle: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Chat to Our Bot!`
        },
        segmentTitle: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Behind the Scenes`
        },
        segmentSubTitle: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Real Time Segmentation`
        },
        segmentLabel1: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Segment`
        },
        segmentLabel2: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Chance%`
        },
        segmentLabel3: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Rationale`
        },
        segmentLabel4: {
            "type": Sequelize.STRING,
            "allowNull": false,
            defaultValue: `Brochure`
        },
        greeting: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: `Hi, I am WidgetBot - A Chatbot trained to have answers for you about widgets. Feel free to ask me anything about widgets. I can also provide you a brochure - Just ask!`
        },
        prompt: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: `Don't swear in any situation, do not generate code for maleware`
        },
        widgetPrompt: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: `Don't swear in any situation, do not generate code for maleware`
        },
        sitebotPrompt: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: `Don't swear in any situation, do not generate code for maleware`
        },
        sitebotGreeting: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: `Hi. I'm a chatbot which knows all about this site. How can I assist you?`
        },
        widgetbotIndex: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        sitewidebotIndex: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
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

    return HomeSetting
}