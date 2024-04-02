const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const auth = require("../middleware/auth");
const {getPatient} = require("../models/patient")
const {createTreatment, getTreatment, getTreatmentByQuery, getPlotValues} = require("../models/treatment");
const {getPatient} = require("../models/patient")

router.get("/patient/:patientid", auth, async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    let treatmentIds = patient.treatments;
    // if(!treatmentIds || treatmentIds.length<1) return res.status(500).send("Something went wrong! Please try again later.");
    const treatments = []
    treatmentIds.forEach(async treatmentId => {
        treatments.push(await getTreatment(treatmentId))
    });
    console.log(treatments)
    res.send(treatments);
});

router.post("/create", auth, async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");

    if(!condition2 && !condition3) return res.status(403).send("Forbidden");

    let treatment = await createTreatment(req.body.symptom, req.body.assesment, req.body.prescription, req.body.duration, req.body.weight, req.body.pressureHigh, req.body.pressureLow, req.body.sugarLevel);
    if(!treatment) return res.status(500).send("Something went wrong! PLease try again later.");

    res.send(treatment);
});

router.get("/:treatmentid", auth, async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    let treatment = await getTreatment(req.params.treatmentid);
    if(!treatment) return res.status(404).send("Invalid objectId.");

    res.send(treatment);
});

module.exports = router; 

