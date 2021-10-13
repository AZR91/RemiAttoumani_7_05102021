const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const db = {}

// @ts-ignore
const sequelize = new Sequelize(process.env.DB_database, process.env.DB_username,process.env.DB_password, {
    host: process.env.DB_host,
    port: process.env.DB_port,
    dialect: process.env.DB_dialect
});

db.Gif = require('./Gif.model')(sequelize, Sequelize);
db.User = require('./User.model')(sequelize, Sequelize);
db.Comment = require('./Comment.model')(sequelize, Sequelize);

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User.belongsToMany(db.Gif,
{
    through: "Like_Gif",
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    allowNull: false
}
);
db.User.belongsToMany(db.Gif,
{
    through: "Dislike_Gif",
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    allowNull: false
}
);
db.Gif.belongsTo(db.User, 
{
    foreignKey: {
    name: 'userId',
    allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
}
);

db.Gif.belongsToMany(db.User,
{
    through: "Like_Gif",
    foreignKey: 'gifId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    allowNull: false
}
);
db.Gif.belongsToMany(db.User,
{
    through: "Dislike_Gif",
    foreignKey: 'gifId',
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
    allowNull: false
}
);
db.Comment.belongsTo(db.User,
{
    foreignKey: {
    name: 'userId',
    allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
}
);
db.Comment.belongsTo(db.Gif,
{
    foreignKey: {
    name: 'gifId',
    allowNull: false,
},
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
}
);

try {
sequelize.authenticate();
console.log('Connection has been established successfully.');
} catch (error) {
console.error('Unable to connect to the database:', error);
}

sequelize.sync({});

module.exports = db;