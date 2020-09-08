module.exports = (sequelize, DataTypes) => {
    const Sentence = sequelize.define('Sentence', {
        english_sentence: {
            type: DataTypes.TEXT,
        },
        slovene_sentence: {
            type: DataTypes.TEXT,
        },
        is_sentence: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        pronounciation_url: {
            type: DataTypes.STRING
        },
    }, {})

    const Lecture = sequelize.models.Lecture;

    Sentence.belongsToMany(Lecture, {
        through: 'LectureSentences'
    });
    Lecture.belongsToMany(Sentence, {
        through: 'LectureSentences'
    });

    return Sentence;
}