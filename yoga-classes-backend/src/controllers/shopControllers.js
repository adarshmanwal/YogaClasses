const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Shop, User } = require("../../models");
const dotenv = require("dotenv");
dotenv.config();
const bucketname = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET;

const s3Client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});
// Create a new shop
exports.createShop = async (req, res) => {
  try {
    const {
      name,
      description,
      ownerId,
      location,
      phoneNumber,
      email,
      openingHours,
      closingHours,
      daysOpen,
    } = req.body;

    // Ensure image is properly received via multer
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Get image details from multer
    const imageFile = req.file;

    const params = {
      Bucket: bucketname,
      Key: imageFile.originalname, // Use original filename
      Body: imageFile.buffer, // Use buffer data from multer
      ContentType: imageFile.mimetype,
    };
    try {
      const command = new PutObjectCommand(params);
      await s3Client.send(command);
    } catch (error) {
      console.log(error);
    }

    // Create shop with image URL
    const imageUrl = `https://${bucketname}.s3.${region}.amazonaws.com/${imageFile.originalname}`;

    const shop = await Shop.create({
      name,
      description,
      image: imageUrl, // Store image URL, not raw data
      ownerId: req.user.id,
      location,
      phoneNumber,
      email,
      openingHours,
      closingHours,
      // daysOpen,
    });

    return res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data: shop,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all shops
exports.getAllShops = async (req, res) => {
  try {
    try {
      const userId = req.user.id;

      const shops = await Shop.findAll({
        where: { ownerId: userId },
        include: [{ model: User, attributes: ["id", "email"] }],
      });

      return res.status(200).json({ success: true, data: shops });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please log in again.",
        });
      }
      throw error;
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single shop by ID
exports.getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id, {
      include: [{ model: User, attributes: ["id", "email"] }],
    });

    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
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
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    await shop.update(updatedData);

    return res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      data: shop,
    });
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
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    await shop.destroy();

    return res
      .status(200)
      .json({ success: true, message: "Shop deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
