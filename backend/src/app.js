const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware");
const routes = require("./routes");


const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/v1", routes);
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running",
  });
});

app.use(errorHandler);
module.exports = app;
