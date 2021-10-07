'use strict';
module.exports = (sequelize, Sequelize) => {
	const Gif = sequelize.define("Gif",
		{
    statusText: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        is: /^([\s\S]){2,255}([\s\.])/,
        len: [2, 255]
    }
    },
    imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
        notEmpty: true
    }
    },
    likes: {
    type: Sequelize.INTEGER,
    notNull: true,
    unsigned: true,
			default: 0
    },
    dislikes: {
    type: Sequelize.INTEGER,
    notNull: true,
    unsigned: true,
			default: 0
    }
}, {
    sequelize,
    modelName: 'Gif',
    paranoid: true
});
return Gif;
};