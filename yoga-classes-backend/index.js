const express = require("express");
const app = express();
const { Sequelize } = require("sequelize");
const port = process.env.PORT
require('dotenv').config();
const config = require("./src/config/config");
// const routes = require("./routes");
const bodyParser = require('body-parser');
var cors = require('cors')

app.use(bodyParser.json({limit:'50mb'})); 
app.use(cors())
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'})); 

// Test the database connection
const sequelize = new Sequelize(config.development);
sequelize
  .authenticate()
  .then(() => console.log("Database connected."))
  .catch((err) => console.error("Unable to connect to the database:", err));

// const userRoutes = require("./routes/userRoutes");
// app.use("/users", userRoutes);

// const shopRoutes = require("./routes/shopRoutes");
// app.use("/shops", shopRoutes);

// app.use(userRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});