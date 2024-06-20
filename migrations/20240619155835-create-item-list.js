"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("item_list_table", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      item_list: {
        type: Sequelize.JSONB,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ItemLists");
  },
};
