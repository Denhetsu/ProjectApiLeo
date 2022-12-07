const Post = require("../models/post.model");
const User = require("../models/user.model");
const Answer = require("../models/answer.models");

const dtoCreateAnswer = async (req, res, next) => {
  try {
    const text = req.body.text;
    const username = req.body.name;
    const userFound = await User.findOne({ name: username });
    const userId = userFound._id;
    const tweet = req.params.tweetId;
    const tweetInit = await Post.exists({ _id: tweet });
    if (!tweetInit) {
      res.status(404).json({ message: "Tweet not found" });
      return;
    }
    if (text === undefined) {
      res.status(400).json({ message: "Veuillez remplir le champ" });
      return;
    }
    if (text.length > 280) {
      res.status(400).json({ message: "Votre réponse est trop longue" });
      return;
    }
    if (tweet === undefined) {
      res.status(400).json({ message: "Veuillez remplir le champ" });
      return;
    }
    if (userId === undefined) {
      res.status(400).json({ message: "Veuillez vous connecter" });
      return;
    }
    next();
  } catch (err) {
    console.log(err, "error controller");
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

module.exports = { dtoCreateAnswer };
