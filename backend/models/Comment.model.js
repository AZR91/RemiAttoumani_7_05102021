'use strict';
module.exports = (sequelize, Sequelize) => {
	const Comment = sequelize.define("Comment",
	{
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            is: /^([\s\S]){2,500}([\s\.])/,
            len: [2, 500]
        }
    }
}, {
    sequelize,
    modelName: 'Comment',
    paranoid: true
});
return Comment;
};