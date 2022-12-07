const Post = require("../models/post.model");
const userModel = require("../models/user.model");

const dtoCreatePost = async (req, res, next) => {
  try {
    const post = req.body.post;

    const postExist = await Post.exists({ text: post });

    if (postExist) {
      res.status(400).send("This post already exist");
      return;
    }

    // if (!postExist) {
    //   res.status(400).send("Post doesn't exist");
    //   return;
    // }

    next();
  } catch (error) {
    console.log(error, "dto");
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoGetPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const postExist = await Post.findById(id);



    console.log(postExist);

    if (!postExist) {
      res.status(400).send("Post is missing");
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Une erreur est survenue");
  }
};

const dtoModifyPost = async (req, res, next) => {
  try {
    const newPost = req.body.post;
    console.log(newPost);
    const idPost = req.params.id;
    console.log(idPost);
    const modifyPost = await Post.findById(idPost);

    if (!modifyPost) {
      res.status(400).send("Post introuvable");
      return;
    }

    if (!newPost) {
      res.status(400).send("Post is missing");
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("erreur serveur");
  }
};

const dtoDeletePost = async (req, res, next) => {
  try {
    const idPost = req.params.id;
    const deletePost = await Post.findById(idPost);

    if (!deletePost) {
      res.status(400).send("Post introuvable");
      return;
    }

    next();
  } catch (error) {
    res.status(500).send("Une erreur est survenue");
  }
};

module.exports = {
  dtoCreatePost,
  dtoGetPost,
  dtoModifyPost,
  dtoDeletePost,
};
