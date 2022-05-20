const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

var dateObj = new Date();

const Patient = mongoose.model('Patient', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bloodType: {
    type: String,
    minlength: 2,
    maxlength: 4
  },
  allergies: {
    type: String,
    minlength: 3,
  },
  treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment"
    }
  ]
  
}));

async function createPatient(userid){
  try{
    let patient = new Patient({
      userid: userid,
      bloodtype: "",
      allergies: "",
      treatments: []
    });
    patient = await patient.save();
    
    user = await addRoles(user, "Patient", patient._id, "patientid");
    if(!user) return null;
    return patient;
  }
  catch(err){ return null; }
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
