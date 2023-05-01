"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      team.hasMany(
        models.player,
        { foreignKey: "teamId" },
        { onDelete: "CASCADE" }
      );
    }
  }
  team.init(
    {
      teamName: DataTypes.STRING,
      teamPlace: DataTypes.STRING,
      totalPerson: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "team",
    }
  );
  return team;
};
