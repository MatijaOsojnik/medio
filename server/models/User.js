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
        },
        icon_url: {
            type: DataTypes.TEXT,
            // default: '@/src/assets/neighbors.svg'
        },
        facebook_id: {
            type: DataTypes.STRING,
        },
        google_id: {
            type: DataTypes.STRING
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
            type: DataTypes.TEXT,
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
    const Story = sequelize.models.Story;
    const History = sequelize.models.History;
    const Category = sequelize.models.Category;
    const Tag = sequelize.models.Tag;
    const Bookmark = sequelize.models.Bookmark
    const Topic = sequelize.models.Topic
    const Follower = sequelize.models.Follower

    Role.belongsToMany(User, {
        through: 'RoleUsers'
    });
    User.belongsToMany(Role, {
        through: 'RoleUsers'
    });

    Story.belongsToMany(User, {
        through: 'StoryUsers'
    })
    User.belongsToMany(Story, {
        through: 'StoryUsers'
    })

    History.belongsTo(User, {
        foreignKey: 'user_id',
        targetKey: 'id'
    });
    History.belongsTo(Story, {
        foreignKey: 'story_id',
        targetKey: 'id'
    });

    Story.belongsTo(Category, {
        foreignKey: 'category_id',
        targetKey: 'id'
    });
    Category.hasMany(Story, {
        foreignKey: 'category_id',
        sourceKey: 'id'
    });

    Publication.belongsToMany(User, {
        through: 'PublicationUsers'
    });
    User.belongsToMany(Publication, {
        through: 'PublicationUsers'
    });

    Publication.belongsToMany(Story, {
        through: 'StoryPublications'
    });
    Story.belongsToMany(Publication, {
        through: 'StoryPublications'
    });

    Tag.belongsToMany(Story, {
        through: 'StoryTags'
    })
    Story.belongsToMany(Tag, {
        through: 'StoryTags'
    })

    Bookmark.belongsTo(User, {
        foreignKey: 'user_id',
        targetKey: 'id'
    });
    Bookmark.belongsTo(Story, {
        foreignKey: 'story_id',
        targetKey: 'id'
    });

        Follower.belongsTo(User, {
            foreignKey: 'follower_id',
            targetKey: 'id'
        });
        Follower.belongsTo(User, {
            foreignKey: 'followed_id',
            targetKey: 'id'
        });

    Topic.belongsToMany(User, {
        through: 'StoryTags'
    })
    User.belongsToMany(Topic, {
        through: 'StoryTags'
    })

    Topic.belongsToMany(Story, {
        through: 'StoryTopics'
    })
    Story.belongsToMany(Topic, {
        through: 'StoryTopics'
    })

    return User;
}