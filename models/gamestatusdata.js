"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameStatusData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GameStatusData.init(
    {
      user_id: DataTypes.STRING,
      game_status_data: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "GameStatusData",
      tableName: "game_status_data_table",
    }
  );
  return GameStatusData;
};
