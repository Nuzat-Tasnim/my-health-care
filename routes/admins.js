const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUserById } = require("../models/user");
const {createAdmin, getAdmin, approveAdmin, getUnapprovedAdminList, logEntry, logs} = require("../models/admin");

router.post("/create", auth, async (req, res) => {
    let user = await getUserById(req.body.userid);
    if(!user) return res.status(404).send("User not found.");

    let admin = await createAdmin(user);
    if(!admin) return res.status(500).send("Something went wrong! PLease try again later.");

    res.send(admin);
});

router.get("/:adminid", auth, async(req, res) => {
    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let admin = await getAdmin(req.params.adminid);
    return admin
})

router.get("/unapproved", auth, async (req, res) => {

    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let adminList = await getUnapprovedAdminList();
    return res.send(adminList) ;

});

router.put("/approve", auth, async (req, res) => {
    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let admin = await getAdmin(req.body.adminid);
    if(!admin) return res.status(404).send("User not found.");

    admin = await approveAdmin(admin, req.user.adminid);
    if(!admin) return res.status(500).send("Something went wrong! PLease try again later.");

    return res.send(admin);

});

router.post("/logEntry", async (req, res) => {
    let admin = await getAdmin(req.body.adminid);
    if(!admin) return res.status(404).send("User not found.");

    admin = await logEntry(req.body.text, admin);
    if(!admin) return res.status(500).send("Something went wrong! PLease try again later.");
    res.send(admin);
});

router.post("/logs/:adminid", async (req, res) => {
    let admin = await getAdmin(req.body.adminid);
    if(!admin) return res.status(404).send("User not found.");

    let adminLogs = await logs(req.params.adminid);
    if(!adminLogs) return res.status(500).send("Something went wrong! PLease try again later.");
    res.send(adminLogs);
});

module.exports = router; 