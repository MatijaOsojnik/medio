module.exports = (sequelize, DataTypes) => {
    const ArticleTags = sequelize.define('ArticleTags', {
        ArticleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Articles',
                key: 'id'
            }
        },
        TagId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Tags',
                key: 'id'
            }
        }
    });
    return ArticleTags;
}