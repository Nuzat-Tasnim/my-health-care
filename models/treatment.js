const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const { encryptString, decryptString } = require("../cryptoJS/aes");
const { getPatient } = require("../models/patient");


const Treatment = mongoose.model('Treatment', new mongoose.Schema({
  symptom: { type: String },
  assessment: { type: String },
  prescription: { type: String },
  duration: { type: String },
  weight: { type: Number },
  pressureHigh: { type: Number },
  pressureLow: { type: Number },
  sugarLevel: { type: Number },
  date: { type: Date },
  nurseAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nurse"
    }
  ]
  
}));

function encrypt(treatment){
  treatment.symptom = encryptString(treatment.symptom);
  treatment.assessment = encryptString(treatment.assessment);
  treatment.prescription = encryptString(treatment.prescription);
  treatment.duration = encryptString(treatment.duration);
  return treatment;
}
function decrypt(treatment){
  treatment.symptom = decryptString(treatment.symptom);
  treatment.assessment = decryptString(treatment.assessment);
  treatment.prescription = decryptString(treatment.prescription);
  treatment.duration = decryptString(treatment.duration);
  return treatment;
}


async function createTreatment(symptom, assessment, prescription, duration, weight, pressureHigh, pressureLow, sugarLevel){
  let treatment = new Treatment({
    symptom: symptom,
    assessment: assessment,
    prescription: prescription,
    duration: duration,
    weight: weight,
    pressureHigh: pressureHigh,
    pressureLow: pressureLow,
    sugarLevel: sugarLevel,
    date: new Date().toLocaleDateString()
  });
  // treatment = encrypt(treatment);
  treatment = await treatment.save();
  return treatment;
}

async function getTreatment(treatmentId){
  let treatment = await Treatment.findById(treatmentId)
  // return decrypt(treatment);
  return treatment;
}

async function getTreatmentByQuery(query){
  let treatments = [];
  try{
    treatments = await Treatment.find(query);
    if(!treatments) return [];
    // for(let i=0;i<treatments.length;i++){
    //   treatments[i] = decrypt(treatments[i]);
    // }
    return treatments;
  }
  catch(err){ return null; }
}

async function getPlotValues(patientid){
  let patient = await getPatient(patientid);
  console.log(patient);
  let treatments = patient.treatments;

  let values = [];
  for(let i=0;i<treatments.length;i++){
    let treatment = treatments[i];
    treatment = await getTreatment(treatment);
    // treatment = decrypt(treatment);
    let value = {
      date: treatment.date,
      weight: treatment.weight,
      pressureHigh: treatment.pressureHigh,
      pressureLow: treatment.pressureLow,
      sugarLevel: treatment.sugarLevel
    }
    values.push(value);
  }
  return values;
}


exports.Treatment = Treatment; 
exports.createTreatment = createTreatment;
exports.getTreatment = getTreatment;
// exports.getTreatments = getTreatments;
exports.getTreatmentByQuery = getTreatmentByQuery;
exports.getPlotValues = getPlotValues;