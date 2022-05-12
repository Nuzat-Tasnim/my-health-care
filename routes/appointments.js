const express = require("express");
const router = express.Router();
const {createAppointment, getAppointmentByDoctorId, getAppointmentById} = require("../models/appointment");

router.post("/set", async(req, res) => {
    let appointment = await createAppointment(req.body.doctorid,req.body.patientid,req.body.date)
    res.send(appointment);
})

router.get("/all", async (req, res) => {
    let appointments = await Appointment.find();
    res.send(appointments);
});

router.post("/addPatient", async (req, res) => {
    await createPatient(req.body.userid, req.body.bloodType, req.body.allergies);
    let patients = await Patient.find().sort("username");
    res.send(patients);
});

router.post("/addTreatment", async (req, res) => {
    res.send(addTreatment(req.body.patientid, req.body.treatmentid));
});


module.exports = router; 