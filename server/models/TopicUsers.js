module.exports = (sequelize, DataTypes) => {
    const TopicUsers = sequelize.define('TopicUsers', {
        TopicId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Topics',
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

    return TopicUsers;
}