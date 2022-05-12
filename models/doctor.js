const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const {searchUser, User} = require("../models/user");


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

async function createDoctor(userid, areaOfExpertise){
  let doctor = new Doctor({
    userid: userid,
    areaOfExpertise: areaOfExpertise
  });
  doctor = await doctor.save();
  let user = await User.findById(userid);
  user.doctorid = doctor._id;
  user = await user.save();
  return doctor;
}


async function rateDoctor(doctorid, rate){
    let doctor = await Doctor.findById(doctorid);
    doctor.rate = rate;
    let result = await doctor.save();
  console.log(result);
}

async function getDoctorByName(name){  
  let users = searchUser(name, "doctor");
  return users;
}

exports.createDoctor = createDoctor;
exports.rateDoctor = rateDoctor;
exports.getDoctorByName = getDoctorByName;

