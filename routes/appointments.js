const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUserById } = require("../models/user");
const { getDoctor } = require("../models/doctor");
const { createPatient, getPatient } = require("../models/patient");
const {Appointment, createAppointment, validate, getAppointmentByQuery, getAppointmentById} = require("../models/appointment");

router.post("/set", auth, async(req, res) => {
    let doctor = await getDoctor(req.body.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    let patientid = "";
    if(!(req.user.roles.includes("Patient"))){
        let patient = await createPatient(await getUserById(req.user._id));
        if(!patient) return res.status(500).send("Something went wrong! PLease try again later.");
        patientid = patient._id;
    }
    else patientid = req.user.patientid;

    let valid = await validate(doctor, patientid, req.body.date);
    if(valid === false)  return res.status(400).send("Please choose another date for appointment.");

    if(valid ===  null) return res.status(500).send("Something went wrong! PLease try again later.");

    if(valid){
        let appointment = await createAppointment(req.body.doctorid,patientid, req.body.date);
        if(!appointment) return res.status(500).send("Something went wrong! PLease try again later.");
        res.send(appointment);
    }
});

router.get("/doctor/:doctorid", auth, async (req, res) => {
    let doctor = await getDoctor(req.params.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    if(req.user.doctorid != req.params.doctorid) return res.status(403).send("Forbidden");

    let query = { 'doctorid': req.params.doctorid };
    let appointments = await getAppointmentByQuery(query);
    if(!appointments) return res.status(500).send("Something went wrong! PLease try again later.");

    res.send(appointments);
});

router.get("/patient/:patientid", auth, async (req, res) => {
    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    if(req.user.patientid != req.params.patientid) return res.status(403).send("Forbidden");

    let query = { 'patientid': req.params.patientid };
    let appointments = await getAppointmentByQuery(query);
    res.send(appointments);
});

router.get("/:appointmentid", auth, async (req, res) => {
    let appointment = await getAppointmentById(req.params.appointmentid);
    if(!appointment) return res.status(404).send("Invalid objectId.");

    let condition1 = req.user.doctorid != appointment.doctorid;
    let condition2 = req.user.patientid != appointment.patientid;

    if(condition1 && condition2) return res.status(403).send("Forbidden");

    res.send(appointment);
});

// router.delete("/ok", async(req, res) => {
    
//     res.send(await Appointment.deleteMany({}));
// })

module.exports = router; 