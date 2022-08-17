require("dotenv").config({ path: ".env" });

// requires
const express = require("express");
const cors = require("cors");

// database connection
require("./database");

// routes and app config
const appConfig = require("./config/app");
const routes = require("./routes");

// starting app
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

// starting port
app.listen(appConfig.port);
