"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayerData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerData.init(
    {
      user_id: DataTypes.STRING,
      player_data: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "PlayerData",
      tableName: "player_data_table",
    }
  );
  return PlayerData;
};
