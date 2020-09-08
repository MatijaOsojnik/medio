module.exports = (sequelize, DataTypes) => {
    const LectureSentences = sequelize.define('LectureSentences', {
        LectureId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Lectures',
                key: 'id'
            }
        },
        SentenceId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Sentences',
                key: 'id'
            }
        }
    });

    return LectureSentences;
}