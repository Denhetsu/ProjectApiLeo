const User = require("../models/user.model");

const dtoCreateUser = async (req, res, next) => {
  try {
    const { name, mail } = req.body;

    console.log(name);
    console.log(mail);

    if (!name) {
      res.status(400).send("Username missing");
      return;
    }

    if (!mail) {
      res.status(400).send("mail is missing");
      return;
    }

    const userExist = await User.exists({ name });
    if (userExist) {
      res.status(400).send("This user already exist");
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoGetUser = async (req, res, next) => {
  try {
    const user = req.params.user;

    if (!user) {
      res.status(400).send("User is missing");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoModifyUser = async (req, res, next) => {
  try {
    const user = req.body.name;

    if (!user) {
      res.status(400).send("Username missing");
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoDeleteUser = async (req, res, next) => {
  try {
    const user = req.params.user;

    if (!user) {
      res.status(404).send("Tu n'a pas de user");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = {
  dtoCreateUser,
  dtoGetUser,
  dtoModifyUser,
  dtoDeleteUser,
};
