const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const { addRoles } = require("../models/user");


var dateObj = new Date();

const Patient = mongoose.model('Patient', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bloodType: { type: String },
  allergies: { type: String },
  treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment"
    }
  ]
  
}));

async function createPatient(user){
  console.log(user);

  try{
    let patient = new Patient({
      userid: user._id,
      bloodtype: "",
      allergies: "",
      treatments: []
    });
    patient = await patient.save();
    console.log(user, patient);
    user = await addRoles(user, "Patient", patient._id, "patientid");
    console.log(user);
    if(!user) return null;
    return patient;
  }
  catch(err){ 
    console.log(err);
    return null; }
}

async function updateProfile(patient, bloodtype, allergies){
  try{
    patient.bloodtype= bloodtype,
    patient.allergies= allergies
    patient = await patient.save();
    return patient;
  }
  catch(err){ return null; }
}

async function addTreatment(patient, treatmentid){
  try{
    patient.treatments.push(treatmentid);
    patient = await patient.save();
    return patient;
  }
  catch(err){
    return null;
  }
}

async function getPatient(patientId){
  return await Patient.findById(patientId);
}


exports.Patient = Patient; 
exports.createPatient = createPatient;
exports.updateProfile = updateProfile;
exports.addTreatment = addTreatment;
exports.getPatient = getPatient;
