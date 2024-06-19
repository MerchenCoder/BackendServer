"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ItemList.init(
    {
      user_id: DataTypes.STRING,
      item_list: DataTypes.JSONB,
    },
    {
      sequelize,
      modelName: "ItemList",
      tableName: "item_list_table",
    }
  );
  return ItemList;
};
