const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const port = process.env.PORT || 3000;
require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

// socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const setUpSocket = require("./src/socket/socket");
setUpSocket(io);

const config = require("./config/config");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use("*", cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// Test the database connection
console.log(config.development);
const sequelize = new Sequelize(config.development);
sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Unable to connect to the database:", err));

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const shopRoute = require("./routes/shops");
app.use("/shops", shopRoute);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
