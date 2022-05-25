const express = require("express");
const router = express.Router();
const {createTreatment, getTreatment, getTreatments, getTreatmentByQuery, getPlotValues} = require("../models/treatment");

router.get("/patient/:patientid", async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    let treatments = await getTreatments(req.params.patientid);
    if(!treatments || treatments.length<1) return res.status(500).send("Something went wrong! Please try again later.");
    res.send(treatments);
});

router.get("/:treatmentid", async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    let treatment = await getTreatment(req.params.treatmentid);
    if(!treatment) return res.status(404).send("Invalid objectId.");

    res.send(treatment);
});

router.post("/create", async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");

    if(!condition2 && !condition3) return res.status(403).send("Forbidden");

    let treatment = await createTreatment(req.body.symptom, req.body.assesment, req.body.prescription, req.body.duration);
    if(!treatment) return res.status(500).send("Soemthing went wrong! PLease try again later.");

    res.send(treatment);
});

router.get("/getValues", async (req, res) => {
    let patient = await getPatient(req.body.patientid);
    if(!patient) return res.status(404).send("User not found.");
    
    let treatments = await getTreatmentByQuery({ "patientid": req.body.patientid });
    if(!treatments) return res.status(400).send("Plot values not available."); //partam na level er exhaustion

    let values = getPlotValues(treatments);
    return res.send(values);
});

module.exports = router; 

