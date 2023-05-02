const player = require("../models").player;
const team = require("../models").team;

const { Op } = require("sequelize");
const addDataPost = async (req, res) => {
  let type = req.params.type;

  let result;
  let {
    teamName,
    teamPlace,
    totalPerson,
    playerName,
    playerNo,
    playerAge,
    teamId,
  } = req.body;

  if (type == "player") {
    try {
      for (let i = 0; i < playerName.length; i++) {
        result = await player.create({
          playerName: playerName[i],
          playerNo: playerNo[i],
          playerAge: playerAge[i],
          teamId: teamId[i],
        });
      }

      return res.json({
        message: "Data is added successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        error: "Error ::::" + error,
      });
    }
  }

  if (type == "team") {
    try {
      for (let i = 0; i < teamName.length; i++) {
        result = await team.create({
          teamName: teamName[i],
          teamPlace: teamPlace[i],
          totalPerson: totalPerson[i],
        });
      }

      return res.json({
        message: "Data is added successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: "fail",
        error: "Error ::::" + error,
      });
    }
  }
};

const showPageGet = async (req, res) => {
  res.render("teamData");
};

const showDataGet = async (req, res, next) => {
  //search

  //data added
  try {
    const { draw, search, order, start, length } = req.query;
    const columns = [
      "id",
      "teamName",
      "teamPlace",
      "totalPerson",
      "playerAge",
      "playerNo",
      "playerName",
      "teamId",
    ];

    console.log(draw, start, order, length);

    const query = {
      where: {},
      offset: parseInt(start) || 0,
      limit: parseInt(length) || 10,
      order: [],
    };

    if (order.length > 0) {
      const { column, dir } = order[0];

      console.log(column, "no of column");

      let columnName = req.query.columns[column].data;
      console.log(columnName, "column name");

      if (columnName.includes("team")) {
        let curr = columnName.split(".");
        columnName = curr[1];
        console.log(curr[1]);
        query.order.push([curr[0], curr[1], dir]);
      } else {
        query.order.push([columnName, dir]);
      }
    }

    // let value = [Op.or]:{}columns.map((column) => ({
    //   [column]: { [Op.like]: `%${search.value}%` },
    // }));

    console.log(query, "queryyyyyyyy");

    const data = await player.findAll({
      order: query.order,
      offset: query.offset,
      limit: query.limit,

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
          model: team,
        },
      ],
    });

    const filtered = await data.length;

    console.log(filtered, "filtererrr");
    const dataCount = await player.count({
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
          model: team,
        },
      ],
    });

    // console.log(dataCount, "totallllllllllllllll");

    // console.log(data, "orwoiejr");

    return res.json({
      draw: draw,
      recordsTotal: dataCount,
      recordsFiltered: dataCount,
      data: data,
    });
  } catch (error) {
    console.log(error);
  }

  // let data_arr = [];

  // fetchData.forEach((element) => {
  //   console.log(element.teamName);
  //   data_arr.push({
  //     RecordId: element.teamName,
  //     TeamName: element.teamName,
  //     TeamPlace: element.teamName,
  //     TotalPerson: element.teamName,
  //     TeamId: element.teamName,
  //     PlayerName: element.teamName,
  //     PlayerJersey: element.teamName,
  //     PlayerAge: element.teamName,
  //   });
  // });
};

module.exports = { addDataPost, showDataGet, showPageGet };
