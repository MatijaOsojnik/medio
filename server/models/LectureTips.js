module.exports = (sequelize, DataTypes) => {
        const LectureTips = sequelize.define('LectureTips', {
            LectureId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Lectures',
                    key: 'id'
                }
            },
            TipId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Tips',
                    key: 'id'
                }
            }
        });
        return LectureTips;
}