const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { getUserById } = require("../models/user");
const { getTreatment } = require("../models/treatment");
const {Patient, createPatient, updateProfile, addTreatment, getPatient } = require("../models/patient");

router.get("/:patientid", auth, async(req, res) => {
    let condition1 = "Admin" in req.user.roles;
    let condition2 = "Doctor" in req.user.roles;
    let condition3 = "Nurse" in req.user.roles;
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition1 && !condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    res.send(patient);
});

router.put("/update/:patientid", auth, async(req, res) => {

    let condition2 = "Doctor" in req.user.roles;
    let condition3 = "Nurse" in req.user.roles;
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");
    
    //Update further that only certain doctors and nurses will have the authorization.

    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    patient = await updateProfile(req.body.bloodType, req.body.allergies);
    if(!patient) return res.status(500).send("Soemthing went wrong! PLease try again later.");
    
    res.send(patient);
});

router.post("/create", auth, async (req, res) => {
    if(!("Admin" in req.user.roles)) return res.status(403).send("Forbidden");

    let patient = getUserById(req.body.patientid);
    if(!patient) return res.status(404).send("User not found.");

    patient = await createPatient(req.body.userid);
    if(!patient) return res.status(500).send("Something went wrong! Please try again later.");

    res.send(patient);
});

router.post("/addTreatment", async (req, res) => {
    let condition2 = "Doctor" in req.user.roles;
    let condition3 = "Nurse" in req.user.roles;

    if(!condition2 && !condition3) return res.status(403).send("Forbidden");

    let patient = getUserById(req.body.patientid);
    if(!patient) return res.status(404).send("User not found.");

    let treatment = getTreatment(req.body.treatmentid);
    if(!treatment) return res.status(404).send("Invalid objectId.");

    patient = await addTreatment(patient, req.body.treatmentid);
    if(!patient) return res.status(500).send("Something went wrong! Please try again later.");

    res.send(patient);
});


module.exports = router; 