const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User,Account } = require("../../models");
const { Op } = require("sequelize");

exports.signUp = async (req, res) => {
  const { email, password, userType,accountId } = req.body;
  try {
    let account = ''
    const hashedPassword = await bcrypt.hash(password, 10);
    if(!accountId){ //new account if accountId is not provided
      account = await Account.create()
    }
    let user = await User.create({
      email,
      password: hashedPassword,
      userType,
      accountId: accountId || account.id,
    });
    user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    user.dataValues.token = token;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email, status: { [Op.ne]: "invited" } },
    });
    if (!user) {
      return res.status(401).json({ error: "EMAIL_NOT_FOUND" });
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    user.dataValues.token = token;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "userType"],
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// exports.deleteProfile = async (req, res) => {
//   try {
//     const user = await User.destroy({
//       where: {
//         id: req.user.id,
//       },
//     });
//     if (user === 0) {
//       return res.status(404).json({ error: "User not found." });
//     }
//     return res.status(200).json({ message: "User Deleted Successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
