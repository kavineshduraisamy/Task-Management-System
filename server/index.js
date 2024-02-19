const db = require("./Config/Dbconfig");
const router = require("./Router/router");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const cronschedule = require("./Controller/taskcontroller");
require("dotenv").config();
db;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);
cronschedule;
app.listen(5000, () => {
  console.log(`server is running in port at 5000`);
});