const User = require("../models/user.model");
const authentication = async (req, res, next) => {
  try {
    const user = req.body.name;
    const password = req.body.password;
    const userFind = await User.findOne({ name: user });
    if (!userFind) {
      res.status(404).send("User not found");
      return;
    }
    if (!password || password === undefined) {
      res.status(401).send("Password is required");
      return;
    }
    if (userFind.password !== password) {
      console.log(password, userFind.password);
      res.status(401).send("Unauthorized");
      return;
    }
    next();
  } catch (err) {
    res.status(500).send("AUTH ERROR");
  }
};

module.exports = { authentication };
