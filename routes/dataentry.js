const express = require("express");
const router = express.Router();

const {User} = require("../models/user");
const {Admin} = require("../models/admin");
const {Nurse} = require("../models/nurse");
const {Doctor} = require("../models/doctor");

const {Review} = require("../models/review");
const {Post} = require("../models/post");
const {Schedule} = require("../models/schedule");

const {Appointment} = require("../models/appointment");

router.delete("/user/deleteAll", async (req, res) => {
    let result = await User.deleteMany({});
    res.send(result);
});

router.post("/user/create", async (req, res) => {
    let users = req.body.users;
    let result = await User.insertMany(users);
    console.log(result);
    res.send(result);
});


router.delete("/admin/deleteAll", async (req, res) => {
    let result = await Admin.deleteMany({});
    res.send(result);
});

router.post("/admin/create", async (req, res) => {
    let admins = req.body.admins;
    let result = await Admin.insertMany(admins);
    console.log(result);
    res.send(result);
});

router.delete("/doctor/deleteAll", async (req, res) => {
    let result = await Doctor.deleteMany({});
    res.send(result);
});

router.post("/doctor/create", async (req, res) => {
    let doctors = req.body.doctors;
    let result = await Doctor.insertMany(nurses);
    console.log(result);
    res.send(result);
});

router.delete("/nurse/deleteAll", async (req, res) => {
    let result = await Nurse.deleteMany({});
    res.send(result);
});

router.post("/nurse/create", async (req, res) => {
    let nurses = req.body.nurses;
    let result = await Nurse.insertMany(nurses);
    console.log(result);
    res.send(result);
});

router.post("/review/create", async (req, res) => {
    let reviews = req.body.reviews;
    let result = await Review.insertMany(reviews);
    console.log(result);
    res.send(result);
});

router.delete("/review/deleteAll", async (req, res) => {
    let result = await Review.deleteMany({});
    res.send(result);
});


router.post("/post/create", async (req, res) => {
    let posts = req.body.posts;
    let result = await Post.insertMany(posts);
    console.log(result);
    res.send(result);
});

router.delete("/post/deleteAll", async (req, res) => {
    let result = await Post.deleteMany({});
    res.send(result);
});


router.post("/schedule/create", async (req, res) => {
    let schedules = req.body.schedules;
    let result = await Schedule.insertMany(schedules);
    console.log(result);
    res.send(result);
});

router.delete("/schedule/deleteAll", async (req, res) => {
    let result = await Schedule.deleteMany({});
    res.send(result);
});


router.post("/appointment/create", async (req, res) => {
    let appointments = req.body.appointments;
    let result = await Appointment.insertMany(appointments);
    console.log(result);
    res.send(result);
});

router.delete("/appointment/deleteAll", async (req, res) => {
    let result = await Appointment.deleteMany({});
    res.send(result);
});

module.exports = router; 


// 
// 
// // ctrl+f >> replace all XXX with the Model
// // then capitalize the values after await (2)
// 
// 
// router.post("/XXX/create", async (req, res) => {
//     let XXXs = req.body.XXXs;
//     let result = await XXX.insertMany(XXXs);
//     console.log(result);
//     res.send(result);
// });

// router.delete("/XXX/deleteAll", async (req, res) => {
//     let result = await XXX.deleteMany({});
//     res.send(result);
// });

