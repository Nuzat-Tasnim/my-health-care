const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getPatient } = require("../models/patient");
const {createNurse, getNurseById, assignPatient, getNurseByName} = require("../models/nurse");

router.post("/assignPatient", auth, async (req, res) => {

    if(!("Doctor" in req.user.roles)) return res.status(403).send("Forbidden");

    let nurse = getNurseById(req.body.nurseid);
    if(!nurse) return res.status(404).send("User not found.");

    let patient = await getPatient(req.body.patientid);
    if(!patient) return res.status(404).send("User not found.");

    patient = await assignPatient(nurse, req.body.patientid);
    if(!patient) return res.status(500).send("Soemthing went wrong! PLease try again later.");

    res.send(patient);
});

router.post("/create", auth, async (req, res) => {
    let user = getUserById(req.body.userid);
    if(!user) return res.status(404).send("User not found.");

    if(!("Admin" in req.user.roles)) res.status(403).send("Forbidden.");

    let nurse = await createNurse(req.body.userid);
    if(!nurse) return res.status(500).send("Something went wrong! PLease try again later.");

    res.send(nurse);
});

router.get("/:nurseid", async (req, res) => {
    let nurse = await getNurseById(req.params.nurseid);
    if(!nurse) return res.status(404).send("User not found.");
    res.send(nurse);
})

router.get("/search", async (req, res) => {
    let nurses = await getNurseByName(req.body.name);
    res.send(nurses);
})

module.exports = router; 