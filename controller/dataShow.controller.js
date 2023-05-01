const player = require("../models").player;
const team = require("../models").team;

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
    console.log(req.query, "euriruewirrijir");
    var draw = req.query.draw;
    var start = req.query.start;
    var length = req.query.length;
    var order_data = req.query.order;

    const columns = ["id", "teamName", "teamPlace", "totalPerson"];

    if (typeof order_data == "undefined") {
      var column_name = "team.id";
      var column_sort_order = "asc";
    } else {
      var column_index = req.query.order[0]["column"];

      var column_name = req.query.columns[column_index]["data"];

      var column_sort_order = req.query.order[0]["dir"];
    }

    console.log(draw, start, length, order_data);

    const data = await team.findAll({
      include: [{ model: player }],
    });

    const dataCount = await player.count();

    console.log(dataCount, "totallllllllllllllll");

    console.log(data, "orwoiejr");

    return res.json({
      draw: draw,
      recordsTotal: data.count,
      recordsFiltered: data.count,
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
