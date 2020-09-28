module.exports = (sequelize, DataTypes) => {
    const StoryTopics = sequelize.define('StoryTopics', {
        StoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Stories',
                key: 'id'
            }
        },
        TopicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Topics',
                key: 'id'
            }
        }
    });
    return StoryTopics;
}