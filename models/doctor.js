const express = require('express');
const mongoose = require('mongoose');
const {User, getUserById, addRoles} = require("../models/user");
const { func } = require('joi');


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


async function createDoctor(userid, areaOfExpertise, approvedBy){
  try{
    let doctor = new Doctor({
      userid: userid,
      areaOfExpertise: areaOfExpertise,
      approvedBy: approvedBy
    });
    doctor = await doctor.save();
    return doctor;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

async function editDoctor(doctorid, areaOfExpertise, schedule){
  let doctor = await Doctor.findById(doctorid);
  doctor.areaOfExpertise = areaOfExpertise;
  doctor.schedule = schedule
  doctor = doctor.save();
  return doctor
}

async function approveDoctor(doctor, adminid){
  doctor.approvedBy = adminid;
  let user = await getUserById(doctor.userid);
  user = await addRoles(doctor.userid, "Doctor", doctor._id);
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

async function getDoctorWithName(doctorid){
  let doctor = await Doctor.findById(doctorid).populate({path: "userid", select: "name"});
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

async function getDoctorByDepartment(areaOfExpertise){
  let result = await Doctor.find({areaOfExpertise: { $regex: areaOfExpertise, $options: 'i' } }).populate({path: "userid", select: "name"});
  return result;
}



exports.createDoctor = createDoctor;
exports.editDoctor = editDoctor;
exports.addSchedule = addSchedule;
exports.getDoctor = getDoctor;
exports.getDoctorWithName = getDoctorWithName;
exports.approveDoctor = approveDoctor;
exports.getUnapprovedDoctorList = getUnapprovedDoctorList;
exports.rateDoctor = rateDoctor;
exports.searchDoctor = searchDoctor;
exports.getDoctorByDepartment = getDoctorByDepartment;

