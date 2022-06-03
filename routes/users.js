const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {editUser, getUsers, getUserById, removeUser, User} = require("../models/user");

router.get("/all", async (req, res) => {
    let users = await getUsers();
    res.send(users);
});

router.get("/:userId", auth, async (req, res) => {
    let user = await getUserById(req.params.userId);
    if(!user) return res.status(404).send("User not found.");

    if(!(req.user.roles.includes("Admin"))  || (req.user._id != req.params.userId)) return res.status(403).send("Forbidden.");

    return res.send(user);
});

router.post("/editUser/:userId", auth, async (req, res) => {
    let user = await getUserById(req.params.userId);

    if(!user) return res.status(404).send("User not found.");

    if(req.user._id != req.params.userId) return res.status(403).send("Forbidden.");

    user = editUser(user, req.body.name, req.body.gender, req.body.birthdate, req.body.address, req.body.contact);
    if(typeof(user) === "string") return res.status(400).send(user);

    //fix this
    user = await getUserById(req.params.userId);
    user = await getUserById(req.params.userId);
    res.send(user);
});

router.delete("/removeuser", async (req, res) => {
    let user = await getUserById(req.body.userid);
    if(!user) return res.status(404).send("User not found.");

    if(!(req.user.roles.includes("Admin"))  || (req.user._id != req.body.userid)) return res.status(403).send("Forbidden.");

    let result = await removeUser(user);
    
    if(!result) return res.status(500).send("Something went wrong! PLease try again later.");
    
    return res.send(user);
});


module.exports = router; 

