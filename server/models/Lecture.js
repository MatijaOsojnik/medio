module.exports = (sequelize, DataTypes) => {
    const Lecture = sequelize.define('Lecture', {
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

    Lecture.belongsTo(Category, {
        foreignKey: 'category_id',
        targetKey: 'id'
    });
    Category.hasMany(Lecture, {
        foreignKey: 'category_id',
        sourceKey: 'id'
    });

    return Lecture;
}