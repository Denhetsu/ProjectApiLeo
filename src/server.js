const express = require("express");
require("../src/database");
const dtoUsers = require("../src/dto/dtoUser");
const userController = require("../src/controllers/users.controller");
const dtoPost = require("../src/dto/dtoPost");
const postController = require("../src/controllers/posts.controller");
const dtoAnswer = require("../src/dto/dto.answer");
const controllerAnswer = require("../src/controllers/answer.controller");
const authentication = require("../src/authentication/authentication");

const app = express();

app.use(express.json());

//User//

app.post(
  "/register",
  dtoUsers.dtoCreateUser,
  userController.createUserController
);

app.get(
  "/getUser/:user",
  authentication.authentication,
  dtoUsers.dtoGetUser,
  userController.getUserController
);

app.patch(
  "/users/:user",
  authentication.authentication,
  dtoUsers.dtoModifyUser,
  userController.modifyUserController
);

app.delete(
  "/deleteUser/:user",
  authentication.authentication,
  dtoUsers.dtoDeleteUser,
  userController.deleteUserController
);

//Post//

app.post(
  "/teweets/create",
  authentication.authentication,
  dtoPost.dtoCreatePost,
  postController.createPostController
);

app.post(
  "/answer/tweet/:tweetId",
  authentication.authentication,
  dtoAnswer.dtoCreateAnswer,
  controllerAnswer.createAnswerController
);

app.get(
  "/GetTweet/:id",
  authentication.authentication,
  dtoPost.dtoGetPost,
  postController.getPostController
);

app.patch(
  "/ModifyTweet/:id",
  authentication.authentication,
  dtoPost.dtoModifyPost,
  postController.modifyPostController
);

app.delete(
  "/DeleteTweet/:id",
  authentication.authentication,
  dtoPost.dtoDeletePost,
  postController.deletePostController
);

app.listen(3000, () => {
  console.log("Server running");
});
