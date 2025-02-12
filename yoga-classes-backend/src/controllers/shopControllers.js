const { Shop, User } = require("../../models");
const jwt = require("jsonwebtoken");

// Create a new shop
exports.createShop = async (req, res) => {
  try {
    const { name, description, image, ownerId, location, phoneNumber, email, openingHours, closingHours, daysOpen } =
      req.body;

    const shop = await Shop.create({
      name,
      description,
      image,
      ownerId,
      location,
      phoneNumber,
      email,
      openingHours,
      closingHours,
      daysOpen,
    });
    console.log(shop)

    return res.status(201).json({ success: true, message: "Shop created successfully", data: shop });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    // Extract token from the request headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Verify the token and get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch only the shops associated with the user
    const shops = await Shop.findAll({
      where: { ownerId: userId },
      include: [{ model: User, attributes: ["id", "email"] }],
    });

    return res.status(200).json({ success: true, data: shops });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single shop by ID
exports.getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id, { include: [{ model: User, attributes: ["id", "name", "email"] }] });

    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    return res.status(200).json({ success: true, data: shop });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update a shop
exports.updateShop = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const shop = await Shop.findByPk(id);
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    await shop.update(updatedData);

    return res.status(200).json({ success: true, message: "Shop updated successfully", data: shop });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a shop
exports.deleteShop = async (req, res) => {
  try {
    const { id } = req.params;

    const shop = await Shop.findByPk(id);
    if (!shop) {
      return res.status(404).json({ success: false, message: "Shop not found" });
    }

    await shop.destroy();

    return res.status(200).json({ success: true, message: "Shop deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
