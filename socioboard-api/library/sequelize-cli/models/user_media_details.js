'use strict';
module.exports = (sequelize, Sequelize) => {
  const user_media_details = sequelize.define('user_media_details', {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
      defaultValue: 0
    },
    media_url: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    thumbnail_url: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    privacy_type: {
      type: Sequelize.INTEGER(3),
      allowNull: false,
      defaultValue: 0
    },
    media_size: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    file_name: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    mime_type: {
      type: Sequelize.STRING(64),
      allowNull: true,
    },
    created_date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user_details',
        key: 'user_id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    team_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'team_informations',
        key: 'team_id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  }, {});
  user_media_details.associate = function (models) {
    user_media_details.belongsTo(models.user_details, { as: 'UserMedia', foreignKey: 'user_id', targetKey: 'user_id' });
    user_media_details.belongsTo(models.team_informations, { as: 'TeamMedia', foreignKey: 'team_id', targetKey: 'team_id' });
    // associations can be defined here
  };
  return user_media_details;
};