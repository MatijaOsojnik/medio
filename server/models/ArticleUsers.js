module.exports = (sequelize, DataTypes) => {
    const ArticleUsers = sequelize.define('ArticleUsers', {
        ArticleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Articles',
                key: 'id'
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });

    return ArticleUsers;
}