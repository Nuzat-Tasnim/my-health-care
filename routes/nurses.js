const express = require("express");
const router = express.Router();
const {Nurse, createNurse, addPatient, getNurseByName} = require("../models/nurse");

router.post("/addpatient", async (req, res) => {
    let users = await addPatient(req.body.nurseid, req.body.patientid);
    res.send(users);
});

router.post("/create", async (req, res) => {
    let nurse = await createNurse(req.body.userid);
    res.send(nurse);
});

router.get("/search", async (req, res) => {
    let nurses = await getNurseByName(req.body.name);
    res.send(nurses);
})





module.exports = router; 