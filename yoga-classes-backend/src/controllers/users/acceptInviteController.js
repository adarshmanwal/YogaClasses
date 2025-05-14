const jwt = require("jsonwebtoken");
const { User, Shop } = require("../../../models");
const acceptInvite = async (req,res) => {
  try {
    const { token } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, shopId } = decoded;

    // Check if the user already exists
    const user = await User.findOne({ where: { email, status: "invited" } });
    if (user) {
      await User.update({ status: "active" }, { where: { email } });
      return res.status(200).json({ message: "User SignUp successfully" });
    }

    return res.status(400).json({ message: "Could not signup the User" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.acceptInvite = acceptInvite;
