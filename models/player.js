"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      player.belongsTo(models.team);
    }
  }
  player.init(
    {
      playerName: DataTypes.STRING,
      playerNo: DataTypes.INTEGER,
      playerAge: DataTypes.INTEGER,
      teamId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "player",
    }
  );
  return player;
};
