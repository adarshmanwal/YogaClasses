const { User } = require("../../../models");
const { Op } = require("sequelize");

exports.getEmployess = async (req, res) => {
  try {
    const { accountId } = req.params;
    const user = await User.findAll({
      where: {
        accountId: accountId,
        userType: "shop_worker",
      },
      attributes: ["id", "email", "userType", "status"],
    }); 
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
