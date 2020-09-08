module.exports = (sequelize, DataTypes) => {
    const LectureUsers = sequelize.define('LectureUsers', {
        LectureId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Lectures',
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

    return LectureUsers;
}