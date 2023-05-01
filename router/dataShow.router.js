var express = require("express");

const router = express.Router();

const {
  addDataPost,
  showDataGet,

  showPageGet,
} = require("../controller/dataShow.controller");

router.get("/", showPageGet);
router.get("/showdata", showDataGet);
router.post("/add/:type", addDataPost);

module.exports = router;
