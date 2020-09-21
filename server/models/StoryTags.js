module.exports = (sequelize, DataTypes) => {
    const StoryTags = sequelize.define('StoryTags', {
        StoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Stories',
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
    return StoryTags;
}