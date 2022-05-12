const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const {User, getUserById, getUserNames, searchUser} = require("../models/user");

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
  ]
  
}));

async function createNurse(userid){
  let user = await User.findById(userid);
  let nurse = new Nurse({userid: userid});
  nurse = await nurse.save();
  user.nurseid = nurse._id;
  result = await user.save();
  return nurse;
}

async function getNurseById(nurseid){
  return await Nurse.findById(nurseid);
}


async function getNurseByName(name){  
  let users = searchUser(name, "nurse");
  return users;
}

async function addPatient(nurseid,patientid){
  let nurse = await Nurse.findById(nurseid);
  nurse.assignedTo.push(patientid);
  await nurse.save();
  return nurse;
}


exports.Nurse = Nurse; 
exports.createNurse = createNurse;
exports.addPatient = addPatient;
exports.getNurseByName = getNurseByName
