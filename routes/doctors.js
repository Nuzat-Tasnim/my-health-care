const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { getUserById, searchAllUsers } = require("../models/user");
const { createReview } = require("../models/review");
const { getPatient } = require("../models/patient");
const {createSchedule} = require("../models/schedule");
const { getDoctor, editDoctor,getDoctorWithName, searchDoctor, createDoctor, addSchedule, approveDoctor, getDoctorByDepartment, getUnapprovedDoctorList} = require("../models/doctor");

router.post("/search", async (req, res) => {
    // let doctors = await getDoctorByName(req.body.name);
    let doctors = await searchAllUsers(req.body.name);

    res.send(doctors);
});

router.post("/seek", async (req, res) => {

    let result = await getDoctorByDepartment(req.body.areaOfExpertise);
    res.send(result);
});

router.put("/edit", async (req, res) => {

    let doctor = await getDoctor(req.body.doctorid);
    let schedule = await createSchedule(req.body.from, req.body.to, req.body.days, req.body.maxApppointment);
    let doctorNew = await editDoctor(doctor, req.body.areaOfExpertise, schedule);
    let doctorWithName = await getDoctorWithName(req.body.doctorid);
    console.log(doctorWithName);
    res.send(doctorWithName);
});

router.post("/create", auth, async (req, res) => {

    // let user = await getUserById(req.body.userid);
    // if(!user) return res.status(404).send("User not found.");

    let doctor = await createDoctor( req.body.userid, req.body.areaOfExpertise, req.body.approvedBy);
    if(!doctor) return res.status(500).send("Something went wrong! PLease try again later.");
    return res.send(doctor);
});


router.post("/rate/:doctorid", auth, async (req, res) => {

    if(!req.user.roles.includes("Patient")) return res.status(403).send("Forbidden");

    let doctor = await getDoctor(req.params.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    let query = {'doctorid': req.user.doctorid, 'patientid': req.user.patientid};
    let appointments = await getAppointmentByQuery(query);
    if(!appointments) return res.status(403).send("Forbidden");

    let result = createReview(doctor, req.body.patientid, req.body.rate, req.body.text);
    if(result === "404") return res.status(404).send("Invalid objectid.");
    if(result === "500") return res.status(500).send("Something went wrong! PLease try again later.");
    res.send(result);
});

router.post("/addSchedule", auth, async (req, res) => {
    let doctor = await getDoctor(req.body.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    if(!(req.user.roles.includes("Doctor") & (req.user.doctorid === req.body.doctorid))) return res.status(403).send("Forbidden");

    let schedule = await addSchedule(doctor, req.body.scheduleid);
    if(!schedule) return res.status(500).send("Something went wrong! PLease try again later.");
    return res.send(schedule);
});

router.get("/unapproved", auth, async (req, res) => {

    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let doctorList = await getUnapprovedDoctorList();
    return res.send(doctorList) ;

});

router.put("/approve", auth, async (req, res) => {
    if(!req.user.roles.includes("Admin")) return res.status(403).send("Forbidden.");

    let doctor = await getDoctor(req.body.doctorid);
    if(!doctor) return res.status(404).send("User not found.");

    doctor = await approveDoctor(doctor, req.user.adminid);
    if(!doctor) return res.status(500).send("Something went wrong! PLease try again later.");

    return res.send(doctor);

});

router.get("/:doctorid", auth, async (req, res) => {
    let doctor = await getDoctorWithName(req.params.doctorid);
    if(!doctor) return res.status(404).send("User not found.");
    console.log("requesting doctor");
    console.log(doctor);
    res.send(doctor);
});

router.get("/getDoctorsByDepartment", async(req, res) => {
    let result = await getDoctorsGroupedByAreaOfExpertise();
    console.log("requesting getDoctorsByDepartment")
    console.log(result);
    res.send(result);
});

module.exports = router; 