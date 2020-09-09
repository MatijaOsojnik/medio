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

        const Category = sequelize.models.Category;

    Article.belongsTo(Category, {
        foreignKey: 'category_id',
        targetKey: 'id'
    });
    Category.hasMany(Article, {
        foreignKey: 'category_id',
        sourceKey: 'id'
    });

    return Article;
}