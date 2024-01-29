module.exports = (sequelize, Sequelize) => {
    const Brochure = sequelize.define('brochures', {
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

    return Brochure
}