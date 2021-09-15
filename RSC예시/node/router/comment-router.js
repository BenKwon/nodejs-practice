const express = require("express");
const router = express.Router();
const CommentController = require("../controller/comment-controller");
router.post("/", CommentController.postComment);
router.get("/", CommentController.getComments);

module.exports = router;
