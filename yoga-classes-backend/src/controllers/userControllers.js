const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  debugger
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = await User.create({
        email,
        password: hashedPassword,
      });
      user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.dataValues.token = token
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  console.log(email, password);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
    try {
      const user = await User.findOne({ where: { email } });
      if(!user){
        return res.status(401).json({ error: "EMAIL_NOT_FOUND" });
      }
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.dataValues.token = token
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       attributes: ["id", "name", "email", "usertype"],
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
