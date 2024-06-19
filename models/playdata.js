"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayData.init(
    {
      user_id: DataTypes.STRING,
      play_data: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "PlayData",
      tableName: "play_data_table",
    }
  );
  return PlayData;
};
