module.exports = (sequelize, DataTypes) => {
    const StoryPublications = sequelize.define('StoryPublications', {
        StoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Stories',
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
    return StoryPublications;
}