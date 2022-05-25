const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUserById } = require("../models/user");
const { createReview } = require("../models/review");
const { getPatient } = require("../models/patient");
const { getDoctor, getDoctorByName, createDoctor, addSchedule} = require("../models/doctor");

router.get("/search", async (req, res) => {
    let doctors = await getDoctorByName(req.body.name);
    res.send(doctors);
});

router.post("/create", auth, async (req, res) => {

    let user = await getUserById(req.body.userid);
    if(!user) return res.status(404).send("User not found.");

    console.log(req.user.roles);

    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let doctor = await createDoctor(user, req.body.userid, req.body.areaOfExpertise);
    if(!doctor) return res.status(500).send("Something went wrong! PLease try again later.");
    return res.send(doctor);
});

router.get("/:doctorid", async (req, res) => {
    let doctor = await getDoctor(req.params.doctorid);
    if(!doctor) return res.status(404).send("User not found.");
    res.send(doctor);
});

router.post("/rate/:doctorid", auth, async (req, res) => {

    let doctor = await getDoctor(req.params.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    let patient = await getPatient(req.params.patientid);
    if(!patient) return res.status(404).send("User not found.");

    //need to update this function so only real patients can review.
    let result = createReview(doctor, req.body.patientid, req.body.rate, req.body.text);
    if(result === "404") return res.status(404).send("Invalid objectid.");
    if(result === "500") return res.status(500).send("Something went wrong! PLease try again later.");
    res.send(result);
});

router.post("/addSchedule", auth, async (req, res) => {
    let doctor = await getDoctor(req.body.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    let schedule = await addSchedule(doctor, req.body.scheduleid);
    if(!schedule) return res.status(500).send("Something went wrong! PLease try again later.");
    return res.send(schedule);
});

module.exports = router; 