const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getDoctor } = require("../models/doctor");
const { createPatient, getPatient } = require("../models/patient")
const {createAppointment, getAppointmentByQuery, getAppointmentById} = require("../models/appointment");
// const {createAppointment, getAppointmentByDoctorId, getAppointmentById, getAppointmentByPatientid} = require("../models/appointment");

router.post("/set", auth, async(req, res) => {
    let doctor = await getDoctor(req.body.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    let patientid = "";
    if(!("Patient" in req.user.roles)){
        let patient = await createPatient(req.user._id);
        if(!patient) return res.status(500).send("Something went wrong! PLease try again later.");
        patientid = patient._id;
    }
    else patientid = req.user.patientid;

    let appointment = await createAppointment(req.body.doctorid,req.body.patientid,req.body.year, req.body,month, req.body.date);
    if(!appointment) return res.status(500).send("Something went wrong! PLease try again later.");
    res.send(appointment);
});

router.get("/:appointmentid", async (req, res) => {
    let appointment = await getAppointmentById(req.params.appointmentid);
    if(!appointment) return res.status(404).send("Invalid objectId.");

    let condition1 = req.user.doctorid != appointment.doctorid;
    let condition2 = req.user.patientid != appointment.patientid;

    if(condition1 || condition2) return res.status(403).send("Forbidden");

    res.send(appointment);
});

router.get("/doctor/:doctorid", async (req, res) => {
    let doctor = await getDoctor(req.params.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    if(req.user.doctorid != req.params.doctorid) return res.status(403).send("Forbidden");

    let query = { 'doctorid': req.params.doctorid };
    let appointments = await getAppointmentByQuery(query);
    if(!appointments) return res.status(500).send("Something went wrong! PLease try again later.");

    res.send(appointments);
});

router.get("/patient/:patientid", async (req, res) => {
    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    if(req.user.patientid != req.params.patientid) return res.status(403).send("Forbidden");

    let query = { 'patientid': req.params.patientid };
    let appointments = await getAppointmentByQuery(query);
    res.send(appointments);
});


// router.get("/doctor/:doctorid", async (req, res) => {
//     let doctor = await getDoctor(req.params.doctorid);
//     if(!doctor) return res.status(400).send("User not found.");

//     let appointments = await getAppointmentByDoctorId(req.params.doctorid);
//     res.send(appointments);
// });

// router.get("/:appointmentid", async (req, res) => {
//     let appointments = await getAppointmentById(req.params.appointmentid);
//     if(!appointment) return res.status(400).send("Invalid objectId.");
//     res.send(appointments);
// });

// router.get("/patient/:patientid", async (req, res) => {
//     let appointments = await getAppointmentByPatientid(req.params.patientid);
//     res.send(appointments);
// });

module.exports = router; 