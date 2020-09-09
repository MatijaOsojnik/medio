module.exports = (sequelize, DataTypes) => {
    const Publication = sequelize.define('Publication', {
        name: {
            type: DataTypes.STRING,
            required: true
        },
        description: {
            type: DataTypes.TEXT,
            required: true
        },
        cover_photo_url: {
            type: DataTypes.STRING
        }
    }, {})

    return Publication;
}