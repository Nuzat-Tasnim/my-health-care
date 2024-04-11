const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { newRequest, findApplyRequestsByType, findApplyRequestsByTypeWithName, approveApplyRequest, rejectApplyRequest } = require("../models/applyRequest");

router.post("/newRequest", auth, async (req, res) => {
    console.log("came here");
    let request = await newRequest(req.body.userid, req.body.appliedAs, req.body.initialData);
    return res.send(request);
});

router.post("/find", auth, async (req, res) => {
    // let requests = await findApplyRequestsByType(req.body.appliedAs);
    let requests = await findApplyRequestsByTypeWithName(req.body.appliedAs);
    return res.send(requests);
});

router.post("/approve", auth, async (req, res) => {
    let request = await approveApplyRequest(req.body.applyRequestId, req.body.adminid);
    // admin log
    return res.send(request);
});

router.post("/reject", auth, async (req, res) => {
    let request = await rejectApplyRequest(req.body.applyRequestId, req.body.adminid);
    // admin log??
    return res.send(request);
});

module.exports = router; 