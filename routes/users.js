const express = require("express");
const router = express.Router();
const {User, createUser, login, getUsers, getUserById, removeUser} = require("../models/user");

router.get("/all", async (req, res) => {
    let users = await getUsers();
    res.send(users);
});

router.get("/login", async (req, res) => {
    console.log(req.body.email, req.body.password);
    let user = await login(req.body.email, req.body.password);
    console.log(user);
    res.send(user);
});


router.get("/:userId", async (req, res) => {
    let user = await getUserById(req.params.userId)
    res.send(user);
});

router.post("/adduser", async (req, res) => {
    let user = await createUser(req.body.name, req.body.gender, req.body.birthdate, req.body.address, req.body.contact, req.body.email, req.body.password);
    res.send(user);
});


router.post("/editUser/:userId", async (req, res) => {
    let user = await getUserById(req.params.userid)
    user = editUser(user, req.body.name, req.body.gender, req.body.birthdate, req.body.address, req.body.contact);
    res.send(user);
});


router.delete("/removeuser", async (req, res) => {
    let user = await getUserById(req.body.userid);
    await removeUser(user);
    let users = await getUsers();
    res.send(users);
});

module.exports = router; 

