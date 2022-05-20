const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {createAdmin, getAdmin, logEntry, logs} = require("../models/admin");

router.post("/create", async (req, res) => {
    let user = await getUserById(req.params.userId);
    if(!user) return res.status(401).send("User not found.");

    let admin = await createAdmin(req.body.userid);
    if(!admin) return res.status(500).send("Soemthing went wrong! PLease try again later.");

    res.send(admin);
});

router.get("/logEntry", async (req, res) => {
    let admin = await getAdmin(req.body.adminid);
    if(!admin) return res.status(404).send("User not found.");

    admin = await logEntry(req.body.text, admin);
    if(!admin) return res.status(500).send("Soemthing went wrong! PLease try again later.");
    res.send(admin);
});

router.get("/logs/:adminid", async (req, res) => {
    let admin = await getAdmin(req.body.adminid);
    if(!admin) return res.status(404).send("User not found.");

    let adminLogs = await logs(req.params.adminid);
    if(!adminLogs) return res.status(500).send("Soemthing went wrong! PLease try again later.");
    res.send(adminLogs);
});

module.exports = router; 