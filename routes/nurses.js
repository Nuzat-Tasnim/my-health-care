const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUserById } = require("../models/user");
const { getPatient } = require("../models/patient");
const {createNurse, getUnapprovedNurseList, approveNurse, getNurseById, assignPatient, getNamedList, getNurseByName} = require("../models/nurse");

router.post("/assignPatient", auth, async (req, res) => {

    if(!(req.user.roles.includes("Doctor"))) return res.status(403).send("Forbidden");

    let query = {'doctorid': req.user.doctorid, 'patientid': req.body.patientid};
    let appointments = await getAppointmentByQuery(query);
    if(!appointments) return res.status(403).send("Forbidden");

    let nurse = getNurseById(req.body.nurseid);
    if(!nurse) return res.status(404).send("User not found.");

    let patient = await getPatient(req.body.patientid);
    if(!patient) return res.status(404).send("User not found.");

    patient = await assignPatient(nurse, req.body.patientid);
    if(!patient) return res.status(500).send("Something went wrong! PLease try again later.");

    res.send(patient);
});

router.get("/assigndToMe", auth, async (req, res) => {
    if(!req.user.roles.includes("nurse")) return res.status(400).send("Bad Request.");

    let nurse = await getNurseById(req.user.nurseid);
    let namedList = await getNamedList(nurse);
    return res.send(namedList);
})

router.post("/create", auth, async (req, res) => {
    let user = await getUserById(req.body.userid);
    if(!user) return res.status(404).send("User not found.");

    let nurse = await createNurse(user);
    if(!nurse) return res.status(500).send("Something went wrong! PLease try again later.");

    res.send(nurse);
});

router.get("/unapproved", auth, async (req, res) => {

    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let nurseList = await getUnapprovedNurseList();
    return res.send(nurseList);
});

router.put("/approve", auth, async (req, res) => {
    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let nurse = await getNurseById(req.body.nurseid);
    if(!nurse) return res.status(404).send("User not found.");

    nurse = await approveNurse(nurse, req.user.adminid);
    if(!nurse) return res.status(500).send("Something went wrong! PLease try again later.");
    
    return res.send(nurse);
});

router.get("/:nurseid", auth, async (req, res) => {
    let nurse = await getNurseById(req.params.nurseid);
    if(!nurse) return res.status(404).send("User not found.");
    res.send(nurse);
})

router.post("/search", async (req, res) => {
    let nurses = await getNurseByName(req.body.name);
    res.send(nurses);
})

module.exports = router; 