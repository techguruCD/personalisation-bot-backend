module.exports = (sequelize, Sequelize) => {
    const Brochure = sequelize.define('brochures', {
        id: {
            "type": Sequelize.UUID,
            "primaryKey": true,
            "defaultValue": Sequelize.UUIDV4
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        segment: {
            "type": Sequelize.STRING,
            "allowNull": false
        },
        charachteristics: {
            "type": Sequelize.TEXT,
            "allowNull": false,
        },
        file: {
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: null,
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