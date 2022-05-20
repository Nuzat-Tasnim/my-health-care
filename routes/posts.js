const express = require("express");
const router = express.Router();
const {Post, createPost, getPost, getPosts} = require("../models/post");

router.get("/feed", async (req, res) => {
    let posts = await getPosts();
    res.send(posts);
});

router.post("/send", async (req, res) => {
    let post = await createPost(req.body.name, req.body.bloodType, req.body.text, req.body.contact);
    if(!post) return res.status(500).send("Soemthing went wrong! PLease try again later.");

    res.send(post)
});

router.get("/:postId", async (req, res) => {
    let post = await getPost(req.params.postId);
    if(!post) return res.status(404).send("Post not found.");

    res.send(post)
});

module.exports = router; 

