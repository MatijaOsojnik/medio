module.exports = (sequelize, DataTypes) => {
    const Topic = sequelize.define('Topic', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        thumbnail_url: {
            type: DataTypes.TEXT
        }
    }, {})

    return Topic;
}