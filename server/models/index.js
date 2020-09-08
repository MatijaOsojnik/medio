const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const db = {}

let sequelize

const basename = path.basename(__filename);

if (process.env.NODE_ENV === 'production') {
    sequelize = new Sequelize(
        config.db.database_url
    )
} else {
    sequelize = new Sequelize(
        config.db.database,
        config.db.username,
        config.db.password,
        config.db.options
    )
}

fs
    .readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(async function (modelName) {
    if ('associate' in db[modelName]) {
        await db[modelName].associate(db)
    }
})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ROLES = ['Member', 'Lecturer', 'Moderator', 'Admin'];

module.exports = db