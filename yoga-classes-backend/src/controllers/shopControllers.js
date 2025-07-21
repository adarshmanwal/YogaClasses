const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { Shop, User } = require("../../models");
const dotenv = require("dotenv");
const { GetShopImages } = require("./Shops/GetShopImages");
dotenv.config();
const { Op } = require('sequelize');

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
    const { id: userId } = req.user;
    const user = await User.findByPk(userId);
    let shops = [];
    // Check if user is a shop admin
    if (user.userType === "shop_admin") {
      shops = await Shop.findAll({
        where: { ownerId: userId },
      });
    } else if (user.userType === "shop_worker") { // Check if user is a shop worker
      shops = await Shop.findAll({
        where: {
          hasAccess: {
            [Op.contains]: [userId],
          },
        },
      });
    }
    const updatedShops = await GetShopImages(shops, s3Client);
    return res.status(200).json({ success: true, data: updatedShops });
  } catch (error) {
    const statusCode = error.name === "TokenExpiredError" ? 401 : 500;
    const message = error.name === "TokenExpiredError"
      ? "Token expired. Please log in again."
      : error.message;

    return res.status(statusCode).json({ success: false, message });
  }
};

// Get a single shop by ID
exports.getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await Shop.findByPk(id, {
      include: [{ model: User, attributes: ["id", "email", "accountId"] }],
    });

    if (!shop) {
      return res
        .status(404)
        .json({ success: false, message: "Shop not found" });
    }

    let workers = [];
    if (shop.hasAccess && shop.hasAccess.length > 0) {
      workers = await User.findAll({
        where: {
          id: {
            [Op.in]: shop.hasAccess,
          },
        },
        attributes: ["id", "email", "accountId","status"],
      });
    }
    return res.status(200).json({
      success: true,
      data: {
        shop: shop.toJSON(),
        workers,
      },
    });
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

    if (req.file) {
      const imageFile = req.file;

      const params = {
        Bucket: bucketname,
        Key: imageFile.originalname,
        Body: imageFile.buffer,
        ContentType: imageFile.mimetype,
      };
      try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
      } catch (error) {
        console.log(error);
      }

      const imageUrl = `https://${bucketname}.s3.${region}.amazonaws.com/${imageFile.originalname}`;
      updatedData.image = imageUrl;
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
