const express = require('express');
const mongoose = require('mongoose');
const {getUserById, addRoles} = require("../models/user");


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
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule"
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
  
}));


async function createDoctor(user, userid, areaOfExpertise){
  try{
    let doctor = new Doctor({
      userid: userid,
      areaOfExpertise: areaOfExpertise,
      approvedBy: null
    });
    doctor = await doctor.save();
    return doctor;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

async function approveDoctor(doctor, adminid){
  doctor.approvedBy = adminid;
  let user = await getUserById(doctor.userid);
  user = await addRoles(user, "Doctor", doctor._id, "doctorid");
  if(!user) return null;

  try{
    doctor = await doctor.save(); 
    return doctor;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

async function getUnapprovedDoctorList(){
  let doctorList = await Doctor.find({approvedBy: { $eq: null }});
  return doctorList;
}



async function rateDoctor(doctorid, rate){
    let doctor = await Doctor.findById(doctorid);
    doctor.rate = rate;
    try{
      doctor = await doctor.save(); 
      return doctor;
    }
    catch(err){
      console.log(err);
      return null;
    }
}

async function getDoctor(doctorid){
  let doctor = await Doctor.findById(doctorid);
  return doctor;
}

async function searchDoctor(name){  
  let doctors = await Doctor.find({
  })
  .populate({
    path: "userid",
    select: "name",
    match: {"name": new RegExp('.*'+name+'.*', 'i')}
  });

  let doctorsFiltered = [];
  for(let i=0;i<doctors.length;i++){
    if(doctors[i].approvedBy === null || doctors[i].userid === null) continue;
    doctorsFiltered.push(doctors[i]);
  }

  console.log(doctorsFiltered);
  return doctorsFiltered;
}

async function addSchedule(doctor, scheduleid){
  doctor.schedule = scheduleid;
  try{
    doctor = await doctor.save();
    return doctor;
  }
  catch(err){
    return null;
  }
}

exports.createDoctor = createDoctor;
exports.addSchedule = addSchedule;
exports.getDoctor = getDoctor;
exports.approveDoctor = approveDoctor;
exports.getUnapprovedDoctorList = getUnapprovedDoctorList;
exports.rateDoctor = rateDoctor;
exports.searchDoctor = searchDoctor;

