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

async function createNurse(userid, approvedBy){
  try{
    let nurse = new Nurse({userid: userid, assignedTo:[], approvedBy: approvedBy});
    nurse = await nurse.save();

    return nurse;
  }
  catch(err){ return null; }
}

async function approveNurse(nurse, adminid){
  nurse.approvedBy = adminid;
  let user = await getUserById(nurse.userid);
  user = await addRoles(user, "Nurse", nurse._id);
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
  console.log(nurse);
  return nurse;
}

async function getNurseByName(name){  
  let users = await searchUser(name, "nurse");
  return users;
}

async function getNamedList(nurse){
  console.log("inside named list", nurse.assignedTo);
  let namedList = [];
  let list = nurse.assignedTo;

  for(let i=0;i<list.length;i++){
    let patient = await getPatient(list[i]);
    console.log("one",patient);
    patient = await getUserById(patient.userid);
    console.log("two",patient);
    let patientNew = {
      patientid: list[i],
      patientname: patient.name
    }
    console.log("three",patientNew);
    namedList.push(patientNew);
  }
  return namedList;
}

async function assignPatient(nurse, patientid){
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