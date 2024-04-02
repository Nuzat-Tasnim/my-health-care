const express = require("express");
const router = express.Router();
const { createSchedule, getSchedule, removeSchedule, validate } = require("../models/schedule");

router.post("/create", async (req, res) => {
    // let result = validate(req.body.from, req.body.to, req.body.days, req.body.maxApppointment);
    // if(result != true) res.status(400).send(result);

    let schedule = await createSchedule(req.body.from, req.body.to, req.body.days, req.body.maxApppointment);
    if(!schedule) return res.status(500).send("Something went wrong! Please try again later.");

    return res.send(schedule);
});

router.get("/:scheduleid", async (req, res) => {
    let schedule = await getSchedule(req.params.scheduleid);
    if(!schedule) return res.status(404).send("Invalid objectid");
    console.log(schedule);
    res.send(schedule);
});

router.delete("/remove/:scheduleid", async (req, res) => {
    let schedule = await getSchedule(req.params.scheduleid);
    if(!schedule) return res.status(404).send("Invalid objectid");

    schedule = await removeSchedule(schedule);
    if(!schedule) return res.status(500).send("Something went wrong! Please try again later.");

    return res.send(schedule);
});

module.exports = router; 

