const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {getUserById} = require("../models/user");
const {createPost, getPost, getPosts, removePost} = require("../models/post");

router.get("/feed", auth, async (req, res) => {
    let posts = await getPosts();
    res.send(posts);
});

router.post("/send", auth, async (req, res) => {
    let user = await getUserById(req.user._id);
    let post = await createPost(req.user._id, user.name, req.body.bloodtype, req.body.text, req.body.contact);
    if(!post) return res.status(500).send("Soemthing went wrong! PLease try again later.");

    res.send(post)
});

router.get("/:postId", auth, async (req, res) => {
    let post = await getPost(req.params.postId);
    if(!post) return res.status(404).send("Post not found.");

    res.send(post)
});

router.delete("/remove/:postid", auth, async (req, res) => {
    let post = await getPost(req.params.postid);
    if(!post) return res.status(404).send("Post not found");

    if(post.userid != req.user._id) return res.status(403).send("Forbidden");

    let result = await removePost(post);
    return res.send(result);
});

module.exports = router; 

