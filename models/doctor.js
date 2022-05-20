const express = require('express');
const mongoose = require('mongoose');
const {searchUser, addRoles} = require("../models/user");


const Doctor = mongoose.model('Doctor', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  areaOfExpertise: {
      type: String
  },
  rate: {
      type: Number
  },
  maxAppointment: {
    type: Number
  }
  
}));


async function createDoctor(user, areaOfExpertise){
  try{
    let doctor = new Doctor({
      userid: user._id,
      areaOfExpertise: areaOfExpertise
    });
    doctor = await doctor.save();
    user = await addRoles(user, "Doctor", doctor._id, "doctorid");
    if(!user) return null;

    return doctor;
  }
  catch(err){
    console.log(err);
    return null;
  }
}


async function rateDoctor(doctorid, rate){
    let doctor = await Doctor.findById(doctorid);
    doctor.rate = rate;
    doctor = await doctor.save();
    return doctor;
}

async function getDoctor(doctorid){
  let doctor = await Doctor.findById(doctorid);
  return doctor;
}

async function getDoctorByName(name){  
  let users = searchUser(name, "doctor");
  return users;
}

exports.createDoctor = createDoctor;
exports.getDoctor = getDoctor;
exports.rateDoctor = rateDoctor;
exports.getDoctorByName = getDoctorByName;

