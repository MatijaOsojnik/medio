module.exports = (sequelize, DataTypes) => {
    const RoleUsers = sequelize.define('RoleUsers', {
        RoleId: {
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

    return RoleUsers;
}