var express = require("express");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");

var data = require("./router/dataShow.router");
app.use(data);

app.listen("5007", (err) => {
  if (err) throw err;

  console.log("App is running on the port 5007");
});
