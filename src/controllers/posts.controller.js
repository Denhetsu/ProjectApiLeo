const Post = require("../models/post.model.js");
const User = require("../models/user.model");

const createPostController = async (req, res) => {
  try {
    const text = req.body.text;
    const isSurvey = req.body.isSurvey;
    const answers = req.body.answers;
    let user = req.body.user;

    const userFind = await User.findOne({ name: user });
    user = userFind._id;

    const NewPost = new Post({
      text,
      user,
      isSurvey,
      answers,
    });

    await NewPost.save();
    res.status(200).send("Tweet Posted");
  } catch (error) {
    console.log(error, "controller");
    res.status(500).json({ message: "Une erreur est survenue " });
  }
};

const getPostController = async (req, res) => {
  try {
    const id = req.params.id;
    const postExist = await Post.findById(id);
    let user = await User.findById(postExist.user);
    res.status(200).json({ postExist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Une erreur est survenue" });
  }
};

const modifyPostController = async (req, res) => {
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

const deletePostController = async (req, res) => {
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
  createPostController,
  getPostController,
  modifyPostController,
  deletePostController,
};
