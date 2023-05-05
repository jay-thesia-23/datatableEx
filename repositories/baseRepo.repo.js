const { Op } = require("sequelize");

module.exports.setModel = (model) => {
  this.model = model;
};

module.exports.getModel = () => {
  return this.model;
};

module.exports.fetchIncluded = (order, offset, limit, search, include) => {
  return this.getModel()
    .findAll({
      order,
      offset,
      limit,
      where: {
        [Op.or]: {
          "$team.teamName$": {
            [Op.like]: `%${search.value}%`,
          },
          "$team.id$": {
            [Op.like]: `%${search.value}%`,
          },
          "$team.teamPlace$": {
            [Op.like]: `%${search.value}%`,
          },
          "$team.totalPerson$": {
            [Op.like]: `%${search.value}%`,
          },
          id: {
            [Op.like]: `%${search.value}%`,
          },
          playerName: {
            [Op.like]: `%${search.value}%`,
          },
          playerNo: {
            [Op.like]: `%${search.value}%`,
          },
          playerAge: {
            [Op.like]: `%${search.value}%`,
          },
        },
      },
      include: include,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err, "errror");
      return res.json(err);
    });
};

module.exports.fetchCount = (search, include) => {
  return this.getModel().count({
    where: {
      [Op.or]: {
        "$team.teamName$": {
          [Op.like]: `%${search.value}%`,
        },
        "$team.id$": {
          [Op.like]: `%${search.value}%`,
        },
        "$team.teamPlace$": {
          [Op.like]: `%${search.value}%`,
        },
        "$team.totalPerson$": {
          [Op.like]: `%${search.value}%`,
        },
        id: {
          [Op.like]: `%${search.value}%`,
        },
        playerName: {
          [Op.like]: `%${search.value}%`,
        },
        playerNo: {
          [Op.like]: `%${search.value}%`,
        },
        playerAge: {
          [Op.like]: `%${search.value}%`,
        },
      },
    },
    include: [
      {
        model: include,
      },
    ],
  });
};
