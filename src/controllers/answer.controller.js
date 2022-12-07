const Post = require("../models/post.model.js");
const User = require("../models/user.model");
const Answer = require("../models/answer.models");

const createAnswerController = async (req, res) => {
  try {
    const text = req.body.text;
    let user = req.body.name;
    const tweet = req.params.tweetId;

    const userFind = await User.findOne({ name: user });
    user = userFind._id;

    const tweetInit = await Post.findOne({ _id: tweet });

    const NewPost = new Answer({
      text,
      user,
      tweet,
    });

    tweetInit.answerIds.push(NewPost._id);
    await tweetInit.save();
    await NewPost.save();
    res.status(200).send("Answer Posted");
  } catch (error) {
    console.log(error, "controller");
    res.status(500).json({ message: "Une erreur est survenue " });
  }
};

const createAnswer = async (req, res) => {
  try {
    const username = req.body.username;
    const tweetId = req.params.tweetId;
    const contentAnswer = req.body.contentAnswer;
    const user = await User.findOne({ username: username, projection: 0 });
    const userId = user._id;
    const tweet = await Tweet.findOne({ _id: tweetId, projection: 0 });
    const answer = new Answer({
      contentAnswer: contentAnswer,
      user: userId,
      username: username,
      tweet: tweetId,
    });

    tweet.answersIds.push(answer._id);
    await tweet.save();
    console.log(tweet.answersIds);
    await answer.save();
    res.status(200).json({ message: "Answer created" });
  } catch (err) {
    console.log(err, "error controller");
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const getAnswerController = async (req, res) => {
  try {
    const id = req.params.id;
    const postExist = await Post.findById(id);
    let user = await User.findById(postExist.user);
    res.status(200).json({
      user: user.name,
      text: postExist.text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const patchAnswerController = async (req, res) => {
  try {
    const newPost = req.body.post;
    const idPost = req.params.id;
    const modifyPost = await Post.findById(idPost);
    console.log(modifyPost);
    modifyPost.post = newPost;

    await modifyPost.save();

    res.status(200).json({ post: modifyPost.post });
  } catch (error) {
    console.log(error);
    res.status(500).send("erreur serveur");
  }
};

const deleteAnswerController = async (req, res) => {
  try {
    const post = req.params.post;
    const idPost = req.params.id;
    const deletePost = await Post.findById(idPost);
    deletePost.remove(deletePost);
    res.status(200).send("Post supprimer");
  } catch (error) {
    res.status(500).json({ message: "Une erreur est survenue " });
  }
};

module.exports = {
  createAnswerController,
  getAnswerController,
  patchAnswerController,
  deleteAnswerController,
};
