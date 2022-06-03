const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const { addRoles } = require("../models/user");
const { decryptString, encryptString } = require("../cryptoJS/aes");

var dateObj = new Date();

const Patient = mongoose.model('Patient', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bloodtype: { type: String },
  allergies: { type: String },
  treatments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatment"
    }
  ],
  myDoctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  }]
}));

function encrypt(patient){
  patient.bloodtype = encryptString(patient.bloodtype);
  patient.allergies = encryptString(patient.allergies);
  return patient
}
function decrypt(patient){
  patient.bloodtype = decryptString(patient.bloodtype);
  patient.allergies = decryptString(patient.allergies);
  return patient
}

async function createPatient(user){
  try{
    let patient = new Patient({
      userid: user._id,
      bloodtype: "",
      allergies: "",
      treatments: []
    });
    patient = await patient.save();
    user = await addRoles(user, "Patient", patient._id, "patientid");
    if(!user) return null;
    return patient;
  }
  catch(err){ 
    console.log(err);
    return null; }
}

async function updateProfile(patient, bloodtype, allergies){
  try{
    
    patient.allergies= allergies,
    patient.bloodtype= bloodtype,
    patient = encrypt(patient);
    patient = await patient.save();
    return patient;
  }
  catch(err){ console.log(err);return null; }
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
  let patient = await Patient.findById(patientId);
  return decrypt(patient);
}




exports.Patient = Patient; 
exports.createPatient = createPatient;
exports.updateProfile = updateProfile;
exports.addTreatment = addTreatment;
exports.getPatient = getPatient;
