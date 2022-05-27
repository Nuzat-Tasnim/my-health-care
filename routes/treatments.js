const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const auth = require("../middleware/auth");
const {createTreatment, getTreatment, getTreatmentByQuery, getPlotValues} = require("../models/treatment");

router.get("/patient/:patientid", auth, async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    let treatments = patient.treatments;
    if(!treatments || treatments.length<1) return res.status(500).send("Something went wrong! Please try again later.");
    res.send(treatments);
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

router.post("/create", auth, async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");

    if(!condition2 && !condition3) return res.status(403).send("Forbidden");

    let treatment = await createTreatment(req.body.symptom, req.body.assesment, req.body.prescription, req.body.duration, req.body.weight, req.body.pressure, req.body.sugarLevel);
    if(!treatment) return res.status(500).send("Soemthing went wrong! PLease try again later.");

    res.send(treatment);
});

router.get("/getValues", async (req, res) => {
    let patient = await getPatient(req.body.patientid);
    if(!patient) return res.status(404).send("User not found.");
    
    let treatments = await getTreatmentByQuery({ "patientid": req.body.patientid });
    if(!treatments) return res.status(400).send("Plot values not available."); //partam na level er exhaustion

    let values = await getPlotValues(treatments);
    console.log("abar vaiya",values);
    return res.send(values);
});

module.exports = router; 

