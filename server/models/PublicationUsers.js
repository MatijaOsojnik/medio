module.exports = (sequelize, DataTypes) => {
    const PublicationUsers = sequelize.define('PublicationUsers', {
        PublicationId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Roles',
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

    return PublicationUsers;
}