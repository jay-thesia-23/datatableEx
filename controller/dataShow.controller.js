const player = require("../models").player;
const team = require("../models").team;
const repoMain = require("../repositories/baseRepo.repo");

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

    console.log(order, "order ");

    //order sorting
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

    console.log(query, "queryyyyyyyy");

    repoMain.setModel(player);

    const data = await repoMain.fetchIncluded(
      query.order,
      query.offset,
      query.limit,
      search,
      team
    );

    console.log(data, "come form the repo");
    const filtered = await data.length;

    console.log(filtered, "filtererrr");
    const dataCount = await repoMain.fetchCount(search, team);

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
};

module.exports = { addDataPost, showDataGet, showPageGet };
