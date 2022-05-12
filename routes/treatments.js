const express = require("express");
const router = express.Router();
const {Treatment, createTreatment, getTreatment, getTreatments} = require("../models/treatment");

router.get("/all", async (req, res) => {
    let treatments = await getTreatments();
    res.send(treatments);
});

router.post("/add", async (req, res) => {
    let treatment = await createTreatment(req.body.symptom, req.body.assesment, req.body.prescription, req.body.duration);
    // res.send(getTreatments());
    res.send(getTreatment(treatment.ObjectId));
});

module.exports = router; 

