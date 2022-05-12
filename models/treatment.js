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
  assesment: {
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


async function createTreatment(symptom, assesment, prescripton, duration){
  let treatment = new Treatment({
    symptom: symptom,
    assesment: assesment,
    prescripton: prescripton,
    duration: duration,
    date: new Date()
  });
  let result = await treatment.save();
  console.log(treatment, result);
  return treatment;
}

async function getTreatments(){
  return await Treatment.find().sort("date")
}

async function getTreatment(treatmentId){
  return await Treatment.findById(treatmentId)
}
exports.Treatment = Treatment; 
exports.createTreatment = createTreatment;
exports.getTreatment = getTreatment;
exports.getTreatments = getTreatments;

