const express = require('express');
const { func } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const { getUserById ,searchUser, addRoles } = require("../models/user");
const { getPatient } = require("../models/patient");

const Nurse = mongoose.model('Nurse', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient"
    }
  ],
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
  
}));

async function createNurse(user){
  try{
    let nurse = new Nurse({userid: user._id, assignedTo:[], approvedBy: null});
    nurse = await nurse.save();

    return nurse;
  }
  catch(err){ return null; }
}

async function approveNurse(nurse, adminid){
  nurse.approvedBy = adminid;
  let user = await getUserById(nurse.userid);
  user = await addRoles(user, "Nurse", nurse._id, "nurseid");
  if(!user) return null;

  try{
    nurse = await nurse.save(); 
    return nurse;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

async function getUnapprovedNurseList(){
  let nurseList = await Nurse.find({approvedBy: { $eq: null }});
  return nurseList;
}

async function getNurseById(nurseid){
  let nurse = await Nurse.findById(nurseid);
  return nurse;
}

async function getNurseByName(name){  
  let users = await searchUser(name, "nurse");
  return users;
}

async function getNamedList(nurse){
  let namedList = [];
  let list = nurse.assignedTo;
  for(let patientid in list){
    let patientname = await getPatient(patientid);
    patientname = await getUserById(patient.userid);
    let patient = {
      patientid: patientid,
      patientname: patientname
    }
    namedList.push(patient);
  }
  return namedList;
}

async function assignPatient(nurse, patientid){
  console.log(nurse.assignedTo);
  nurse.assignedTo.push(patientid);
  console.log(nurse.assignedTo);
  nurse.assignedTo.push(patientid);
  try{
    nurse = await nurse.save();
    return nurse;
  }
  catch(err){ return null; }
}


exports.Nurse = Nurse; 
exports.createNurse = createNurse;
exports.getNurseById = getNurseById;
exports.assignPatient = assignPatient;
exports.approveNurse = approveNurse;
exports.getUnapprovedNurseList = getUnapprovedNurseList;
exports.getNurseByName = getNurseByName
exports.getNamedList = getNamedList;