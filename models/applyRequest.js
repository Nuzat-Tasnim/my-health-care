const express = require('express');
const { func } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const { getUserById ,searchUser, addRoles } = require("../models/user");
const { getPatient } = require("../models/patient");
const { createDoctor } = require('./doctor');
const { createNurse } = require('./nurse');
const { createAdmin } = require('./admin');

const ApplyRequest = mongoose.model('ApplyRequest', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  appliedAs: { type: String },
  initialData: { type: String },
  
}));

async function newRequest(userid, appliedAs, initialData){
  try{
    let applyRequest = ApplyRequest.findOne({"userid": userid, "appliedAs": appliedAs});
    if(applyRequest!=null){
        applyRequest.remove();
    }
    applyRequest = new ApplyRequest({userid: userid, appliedAs:appliedAs, initialData: initialData});
    applyRequest = await applyRequest.save();
    console.log(applyRequest);
    return applyRequest;
  }
  catch(err){ return null; }
}

async function findApplyRequestsByTypeWithName(appliedAs){
  try {
    let applyRequests = await ApplyRequest.find({"appliedAs": appliedAs}).populate({path: "userid", select: "name"});
    return applyRequests;

} catch (error) { return error; }
}

async function findApplyRequestsByType(appliedAs){
    try {
        let applyRequests = await ApplyRequest.find({"appliedAs": appliedAs});
        return applyRequests;

    } catch (error) { return error; }
}
async function approveApplyRequest(applyRequestId, adminid){
    try {
        let applyRequest = await ApplyRequest.findById(applyRequestId);
        console.log(applyRequest);
        let result = "";
        if(applyRequest.appliedAs.includes("Doctor")) result = await createDoctor(applyRequest.userid, applyRequest.initialData, adminid);
        if(applyRequest.appliedAs.includes("Nurse")) result = await createNurse(applyRequest.userid, adminid);
        if(applyRequest.appliedAs.includes("Admin")) {
          console.log("???");
          result = await createAdmin(applyRequest.userid, adminid);
        }
        
        await addRoles(applyRequest.userid, applyRequest.appliedAs, result._id);

        await applyRequest.remove();

    } catch (error) { return error; }
}

async function rejectApplyRequest(applyRequestId, adminid){
    try {
        let applyRequest = await ApplyRequest.findById(applyRequestId);
        await applyRequest.remove();
    } catch (error) { return error; }

}

// async function approveNurse(userid, adminid){
//   nurse.approvedBy = adminid;
//   let user = await getUserById(nurse.userid);
//   user = await addRoles(user, "Nurse", nurse._id, "nurseid");
//   if(!user) return null;

//   try{
//     nurse = await nurse.save(); 
//     return nurse;
//   }
//   catch(err){
//     console.log(err);
//     return null;
//   }
// }

// async function getUnapprovedNurseList(){
//   let nurseList = await Nurse.find({approvedBy: { $eq: null }});
//   return nurseList;
// }



exports.ApplyRequest = ApplyRequest;
exports.newRequest = newRequest;
exports.findApplyRequestsByType = findApplyRequestsByType;
exports.findApplyRequestsByTypeWithName = findApplyRequestsByTypeWithName;
exports.approveApplyRequest = approveApplyRequest;
exports.rejectApplyRequest = rejectApplyRequest;