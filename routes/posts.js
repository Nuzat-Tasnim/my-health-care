const express = require("express");
const router = express.Router();
const {Post, createPost, getPost, getPosts} = require("../models/post");

router.get("/feed", async (req, res) => {
    let posts = await getPosts();
    res.send();
});

router.post("/send", async (req, res) => {
    let post = await createPost(req.body.username, req.body.bloodType, req.body.text, req.body.contact);
    res.send(post)
});

router.get("/:postId", async (req, res) => {
    let post = await getPost(req.params.postId);
    res.send(post)
});

module.exports = router; 

