const express = require("express");
const User = require("../models/user.model");
const app = express();

app.use(express.json());

// Post User //
const createUserController = async (req, res) => {
  try {
    const { name, mail, password } = req.body;

    const newUser = new User();
    newUser.password = password;
    newUser.name = name;
    newUser.mail = mail;

    await newUser.save();

    res.status(200).send("user created");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue " });
  }
};

// Get User //
const getUserController = async (req, res) => {
  try {
    const user = req.params.user;
    const usernameExist = await User.findOne({ name: user });
    res.status(200).json({
      name: usernameExist.name,
      mail: usernameExist.mail,
    });
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue " });
  }
};

// Patch User //
const modifyUserController = async (req, res) => {
  try {
    const newName = req.body.name;
    const newMail = req.body.mail;
    const user = req.params.user;

    const modifyUser = await User.findOne({ name: user });

    modifyUser.name = newName;
    if (!newMail) {
      return;
    } else {
      modifyUser.mail = newMail;
    }

    await modifyUser.save();

    res.status(200).json({ name: modifyUser.name, mail: modifyUser.mail });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

// Delete User //
const deleteUserController = async (req, res) => {
  try {
    const user = req.params.user;
    const deleteUser = await User.findOne({ user: user });
    console.log(deleteUser);
    deleteUser.remove(deleteUser);
    res.status(200).send("Utilisateur Supprimer");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = {
  createUserController,
  getUserController,
  modifyUserController,
  deleteUserController,
};
