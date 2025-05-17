const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");
const SECRET_KEY = "your_secret_key";
const { User, Shop } = require("../../../models");

exports.inviteEmployee = async (req, res) => {
  try {
    const { email,accountId } = req.body;
    const { shopId } = req.params;
    const adminId = req.user.id;

    // Check if the shop exists and the admin owns it
    const shop = await Shop.findOne({
      where: { id: shopId, ownerId: adminId },
    });
    if (!shop)
      return res
        .status(403)
        .json({ message: "Unauthorized to invite employees to this shop" });

    // Generate an invitation token
    const token = jwt.sign({ email, shopId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send email with invitation link
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.email",
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: "<adarshmawnal9@gmail.com>",
      to: email,
      subject: "You are invited to join a shop!",
      text: `Click the link to accept: http://localhost:5173/auth/accept-invite?token=${token}`,
    });
    console.log("Message sent: %s", info.messageId);

    const hashedPassword = await bcrypt.hash("password", 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      userType: "shop_worker",
      status: "invited",
      accountId: accountId,
    });

    res
      .status(200)
      .json({ user: user, message: "Invitation sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employee accepts the invitation
exports.acceptInvite = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    const { email, shopId } = decoded;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add employee to the shop
    await user.update({ shopId });

    // Optionally delete the invitation record
    await Invitation.destroy({ where: { token } });

    res
      .status(200)
      .json({ message: "Invitation accepted, you are now part of the shop" });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
};
