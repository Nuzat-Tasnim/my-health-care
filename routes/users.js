const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {editUser, getUsers, getUserById, removeUser, searchAllUsers, searchNotAllUsers} = require("../models/user");

router.get("/all", async (req, res) => {
    let users = await getUsers();
    res.send(users);
});

router.post("/search", auth, async(req, res) => {
    let users = [];
    if((req.user.roles.includes("Admin"))  || (req.user.roles.includes("Doctor")) || (req.user.roles.includes("Nurse"))  ) {
        users = await searchAllUsers(req.body.name);
        return res.send(users);
    }
    else {
        users = await searchNotAllUsers(req.body.name);
        return res.send(users);
    }

});

router.get("/:userid", auth, async (req, res) => {
    let user = await getUserById(req.params.userid);
    if(!user) return res.status(404).send("User not found.");

    let condition1 = req.user.roles.includes("Admin");
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.userid === req.user._id;
    

    if(!condition1 && !condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    return res.send(user);
});

router.post("/editUser/:userid", auth, async (req, res) => {
    console.log("editUser is requested")
    let user = await getUserById(req.params.userid);
    console.log("user is retrieved", req.params.userid, "-->", user)
    

    if(req.user._id != req.params.userid) return res.status(403).send("Forbidden.");

    user = editUser(user, req.body.name, req.body.gender, req.body.year, req.body.month, req.body.day, req.body.address, req.body.contact);
    if(typeof(user) === "string") return res.status(400).send(user);

    //fix this
    user = await getUserById(req.params.userid);
    user = await getUserById(req.params.userid);
    res.send(user);
});

router.delete("/removeuser/:userid", async (req, res) => {
    let user = await getUserById(req.params.userid);
    if(!user) return res.status(404).send("User not found.");

    if(!(req.user.roles.includes("Admin"))  || (req.user._id != req.params.userid)) return res.status(403).send("Forbidden.");

    let result = await removeUser(user);
    
    if(!result) return res.status(500).send("Something went wrong! PLease try again later.");
    
    return res.send(user);
});

module.exports = router; 

