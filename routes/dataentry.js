const express = require("express");
const router = express.Router();
const {createUser} = require("../models/user");
const {createNurse} = require("../models/nurse");
const {createDoctor} = require("../models/doctor");


router.post("/user", async (req, res) => {
    let users = req.body.users;
    let users1 = [];
    users.array.forEach(element => {
        let user = await createUser(element.name, element.gender, element.birthdate, element.address, element.contact, element.email, element.password);
        users1.push(user);
    });
    res.send(users1);
});

router.post("/nurse", async (req, res) => {
    let nurses = req.body.nurses;
    let nurses1 = [];
    nurses.array.forEach(element => {
        let nurse = await createNurse(element.userid);
        nurses1.push(nurse);
    });
    res.send(nurses1);
});

router.post("/doctor", async (req, res) => {
    let doctors = req.body.doctor;
    let doctors1 = [];
    nurses.array.forEach(element => {
        let doctor = await createDoctor(element.userid, element.areaOfExpertise);
        doctors1.push(doctor);
    });
    res.send(doctors1);
});

