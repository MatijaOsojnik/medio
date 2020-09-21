module.exports = (sequelize, DataTypes) => {
    const StoryUsers = sequelize.define('StoryUsers', {
        StoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Stories',
                key: 'id'
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    });

    return StoryUsers;
}