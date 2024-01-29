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

    return HomeSetting
}