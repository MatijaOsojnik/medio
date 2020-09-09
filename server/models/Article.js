module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        title: {
            type: DataTypes.STRING
        },
        short_description: {
            type: DataTypes.TEXT
        },
        description: {
            type: DataTypes.TEXT
        },
        thumbnail_url: {
            type: DataTypes.STRING
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Category,
                key: 'id'
            }
        }
    }, {});

    return Article;
}