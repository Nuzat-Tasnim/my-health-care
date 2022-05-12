const express = require("express");
const router = express.Router();
const {Patient, createPatient, addTreatment, getPatient, getPatients} = require("../models/patient");

router.get("/all", async (req, res) => {
    let patients = await getPatients()
    res.send(patients);
});

router.get("/:patientid", async(req, res) => {
    let patient = await getPatient(req.params.patientid)
    res.send(patient)
})

router.post("/addPatient", async (req, res) => {
    let patient = await createPatient(req.body.userid);
    res.send(patient);
});

router.post("/addTreatment", async (req, res) => {
    let treatment = await addTreatment(req.body.patientid, req.body.treatmentid)
    res.send(treatment);
});


module.exports = router; 