require("dotenv").config({ path: ".env" });

// requires
const express = require("express");
const cors = require("cors");
const path = require("path");

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

// Function to serve all static files
// inside public directory.
app.use("/storage", express.static(path.join(__dirname, "storage")));

// starting port
app.listen(appConfig.port, () => {
  console.log(`App listening on port ${appConfig.port}`);
});
