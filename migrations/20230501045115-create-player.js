"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("players", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playerName: {
        type: Sequelize.STRING,
      },
      playerNo: {
        type: Sequelize.INTEGER,
      },
      playerAge: {
        type: Sequelize.INTEGER,
      },
      teamId: {
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "teams",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("players");
  },
};
