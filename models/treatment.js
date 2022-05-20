const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const Treatment = mongoose.model('Treatment', new mongoose.Schema({
  symptom: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  assessment: {
    type: String,
  },
  prescripton: {
      type: String,
      required: true,
      minlength: 5
  },
  duration: {
    type: String
  },
  date: {
      type: Date
  },
  
  nurseAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Nurse"
    }
  ]
  
}));


async function createTreatment(symptom, assessment, prescripton, duration){
  let treatment = new Treatment({
    symptom: symptom,
    assessment: assessment,
    prescripton: prescripton,
    duration: duration,
    date: new Date()
  });
  treatment = await treatment.save();
  return treatment;
}

async function getTreatments(patientid){
  try{
    let treatments = await Treatment.find({"patientid": patientid}).sort("date")
    return treatments; 
  }
  catch(err){ return null; }
}

async function getTreatment(treatmentId){
  return await Treatment.findById(treatmentId)
}
exports.Treatment = Treatment; 
exports.createTreatment = createTreatment;
exports.getTreatment = getTreatment;
exports.getTreatments = getTreatments;

