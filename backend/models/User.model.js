'use strict';
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("User",
{
    firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
        len: [2,25]
    }
    },
    lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
        len: [2,25]
    }
    },
    email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'email',
    validate: {
        notEmpty: true
    }
    },
    password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    }
    },
    avatarUrl: {
    type: Sequelize.STRING
    },
    isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
    }
}, {
    sequelize,
    modelName: 'User',
    paranoid: true,
});
return User;
};