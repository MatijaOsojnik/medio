module.exports = (sequelize, DataTypes) => {
    const ArticlePublications = sequelize.define('ArticlePublications', {
        ArticleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Articles',
                key: 'id'
            }
        },
        PublicationId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Publications',
                key: 'id'
            }
        }
    });
    return ArticlePublications;
}