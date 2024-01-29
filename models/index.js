const dbConfig = require('../configs/db.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig[process.env.ENV]);

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.js')(sequelize, Sequelize)
// db.profile = require('./profile.js')(sequelize, Sequelize)

// db.profile.belongsTo(db.user, {foreignKey: 'userId', as: 'user'})
// db.user.hasOne(db.profile, {foreignKey: 'userId', as: 'profile'})

db.blog = require('./blog.js')(sequelize, Sequelize)
db.homeSetting = require('./homeSetting.js')(sequelize, Sequelize)
db.brochure = require('./brochure.js')(sequelize, Sequelize)

// db.question = require('./question.js')(sequelize, Sequelize)
// db.question.belongsTo(db.user, {foreignKey: 'intervieweeId', as: 'user'})
// db.user.hasMany(db.question, {foreignKey: 'intervieweeId', as: 'questions'})

// db.chatbotquestion = require('./chatbotquestion.js')(sequelize, Sequelize)

module.exports = db;