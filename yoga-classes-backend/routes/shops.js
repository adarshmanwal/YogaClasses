var express = require("express");
const multer = require("multer");
const {
  createShop,
  getAllShops,
  getShopById,
  updateShop,
  deleteShop,
} = require("../src/controllers/shopControllers");
const authenticate = require("../src/middlewares/authMiddleware");

const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });

var router = express.Router();
// Protected routes
router.post("/create", authenticate,upload.single("image"), createShop);
router.get("/all", authenticate, getAllShops);
router.get("/:id", authenticate, getShopById);
router.put("/update/:id", authenticate, updateShop);
router.delete("/delete/:id", authenticate, deleteShop);

module.exports = router;
