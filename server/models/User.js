const bcrypt = require('bcrypt')

function hashPassword(user, options) {
    const SALT_FACTOR = 10
    if (!user.changed('password')) {
        return;
    }
    return bcrypt
        .genSalt(SALT_FACTOR)
        .then(salt =>
            bcrypt.hash(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        display_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        icon_url: {
            type: DataTypes.STRING,
            // default: '@/src/assets/neighbors.svg'
        },
        birth_date: {
            type: DataTypes.DATE
        },
        phone_num: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        instagram_url: {
            type: DataTypes.STRING
        },
        facebook_url: {
            type: DataTypes.STRING
        },
        linkedin_url: {
            type: DataTypes.STRING
        },
        twitter_url: {
            type: DataTypes.STRING
        },
        isWriter: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        hooks: {
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password) {
        return bcrypt.compare(password, this.password)
    }

    const Role = sequelize.models.Role;
    const Publication = sequelize.models.Publication
    const Article = sequelize.models.Article;
    const History = sequelize.models.History;
    const Category = sequelize.models.Category;
    const Tag = sequelize.models.Tag;
    const Bookmark = sequelize.models.Bookmark

    Role.belongsToMany(User, {
        through: 'RoleUsers'
    });
    User.belongsToMany(Role, {
        through: 'RoleUsers'
    });

    Article.belongsToMany(User, {
        through: 'ArticleUsers'
    })
    User.belongsToMany(Article, {
        through: 'ArticleUsers'
    })

    History.belongsTo(User, {
        foreignKey: 'user_id',
        targetKey: 'id'
    });
    History.belongsTo(Article, {
        foreignKey: 'article_id',
        targetKey: 'id'
    });

    Article.belongsTo(Category, {
        foreignKey: 'category_id',
        targetKey: 'id'
    });
    Category.hasMany(Article, {
        foreignKey: 'category_id',
        sourceKey: 'id'
    });

    Publication.belongsToMany(User, {
        through: 'PublicationUsers'
    });
    User.belongsToMany(Publication, {
        through: 'PublicationUsers'
    });

    Publication.belongsToMany(Article, {
        through: 'ArticlePublications'
    });
    Article.belongsToMany(Publication, {
        through: 'ArticlePublications'
    });

    Tag.belongsToMany(Article, {
        through: 'ArticleTags'
    })
    Article.belongsToMany(Tag, {
        through: 'ArticleTags'
    })

    Bookmark.belongsTo(User, {
        foreignKey: 'user_id',
        targetKey: 'id'
    });
    Bookmark.belongsTo(Article, {
        foreignKey: 'article_id',
        targetKey: 'id'
    });

    return User;
}