var express = require("express");
const {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} = require("../src/controllers/shopControllers");

var router = express.Router();

// Create a new shop
router.post("/create", createShop);

// Get all shops
router.get("/all", getAllShops);

// Get a single shop by ID
router.get("/:id", getShopById);

// Update a shop
router.put("/update/:id", updateShop);

// Delete a shop
router.delete("/delete/:id", deleteShop);

module.exports = router;
