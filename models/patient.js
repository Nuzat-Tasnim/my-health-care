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

// not sure about this
async function createPatient(userid){
  let patient = new Patient({
    userid: userid,
    // bloodtype: bloodtype,
    // allergies: allergies,
    treatments: []
  });
  let result = await patient.save();
  console.log(patient,result);
  return patient;
}

// not sure about this either
async function addTreatment(patientid, treatmentid){
  let patient = await Patient.findById(patientid);
  patient.treatments.push(treatmentid);
  await patient.save();
  return patient;
}

async function getPatient(patientId){
  return await Patient.findById(patientId)
}

async function getPatients(){
  return await Patient.find()
}

exports.Patient = Patient; 
exports.createPatient = createPatient;
exports.addTreatment = addTreatment;
exports.getPatient = getPatient;
exports.getPatients = getPatients;
