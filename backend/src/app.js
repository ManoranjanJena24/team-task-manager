const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware");
const routes = require("./routes");
const { client } = require("./config/redis");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");


const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(morgan("dev"));

app.use(express.json());

app.get("/redis-test", async (req, res) => {
  await client.set("hello", "world");

  const value = await client.get("hello");

  res.json({
    value,
  });
});

app.use("/api/v1", routes);
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running",
  });
});

app.use(
  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(swaggerSpec),
);

app.use(errorHandler);
module.exports = app;
