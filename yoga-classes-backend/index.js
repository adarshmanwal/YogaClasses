const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const port = process.env.PORT || 3000;
require("dotenv").config();
const config = require("./config/config");
const bodyParser = require("body-parser");
const cors = require("cors");


// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's URL
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
