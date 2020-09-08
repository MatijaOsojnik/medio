module.exports = (sequelize, DataTypes) => {
    const Tip = sequelize.define('Tip', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {})

    const Lecture = sequelize.models.Lecture;

    Tip.belongsToMany(Lecture, {
        through: 'LectureTips'
    });
    Lecture.belongsToMany(Tip, {
        through: 'LectureTips'
    });

    return Tip;
}