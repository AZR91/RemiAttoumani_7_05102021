'use strict';
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("User",
{
    firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
        len: [2,25]
    }
    },
    lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        is: /^[a-z]+$/i,
        notEmpty: true,
        len: [2,25]
    }
    },
    email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'email',
    validate: {
        isEmail: true,
        notEmpty: true,
        is: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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