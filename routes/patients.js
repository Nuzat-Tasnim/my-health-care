const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { getUserById } = require("../models/user");
const { getTreatment, getPlotValues } = require("../models/treatment");
const { getNurseById } = require("../models/nurse");
const { getAppointmentByQuery } = require("../models/appointment");
const { createPatient, updateProfile, addTreatment, getPatient } = require("../models/patient");

router.put("/update/:patientid", auth, async(req, res) => {

    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.patientid === req.user.patientid;

    if(!condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    if(condition2){
        let query = {'doctorid': req.user.doctorid, 'patientid': req.params.patientid};
        let appointments = await getAppointmentByQuery(query);
        if(!appointments) return res.status(403).send("Forbidden");
    }

    if(condition3){
        let condition5 = await getNurseById(req.user.nurseid).assignedTo.includes(req.params.patientid);
        if(!condition5) return res.status(403).send("Forbidden");
    }   
    
    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    patient = await updateProfile(patient, req.body.bloodtype, req.body.allergies, req.body.medicalHistories);
    if(!patient) return res.status(500).send("Something went wrong! PLease try again later.");
    
    res.send(patient);
});


router.post("/create", auth, async (req, res) => {

    let user = await getUserById(req.body.userid);
    if(!user) return res.status(404).send("User not found.");

    // maxApppointmentconditions not yet checked

    patient = await createPatient(user);
    if(!patient) return res.status(500).send("Something went wrong! Please try again later.");

    res.send(patient);
});

router.post("/addTreatment", auth, async (req, res) => {
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");

    if(!condition2 && !condition3) return res.status(403).send("Forbidden");

    let patient = await getPatient(req.body.patientid);
    if(!patient) return res.status(404).send("User not found.");

    let treatment = getTreatment(req.body.treatmentid);
    if(!treatment) return res.status(404).send("Invalid objectId.");

    patient = await addTreatment(patient, req.body.treatmentid);
    if(!patient) return res.status(500).send("Something went wrong! Please try again later.");

    res.send(patient);
});

router.get("/:patientid", auth, async(req, res) => {
    let condition1 = req.user.roles.includes("Admin");
    let condition2 = req.user.roles.includes("Doctor");
    let condition3 = req.user.roles.includes("Nurse");
    let condition4 =  req.params.patientid === req.user.patientid;
    

    if(!condition1 && !condition2 && !condition3 && !condition4) return res.status(403).send("Forbidden");

    if(condition3){
        let condition5 = await getNurseById(req.user.nurseid).assignedTo.includes(req.params.patientid);
        if(!condition5) return res.status(403).send("Forbidden");
    }

    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    res.send(patient);
});

router.get("/plotdata/:patientid", async(req, res) => {
    let result = await getPlotValues(req.params.patientid);
    return res.send(result);
});


module.exports = router; 