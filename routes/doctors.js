const express = require("express");
const router = express.Router();
const {Doctor, getDoctorByName, createDoctor} = require("../models/doctor");

router.get("/search", async (req, res) => {
    let doctors = await getDoctorByName(req.body.name);
    res.send(doctors);
})

router.post("/create", async (req, res) => {
    let doctor = await createDoctor(req.body.userid, req.body.areaOfExpertise);
    res.send(doctor);
});

module.exports = router; 