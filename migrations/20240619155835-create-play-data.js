"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("play_data_table", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      play_data: {
        type: Sequelize.JSONB,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PlayData");
  },
};
