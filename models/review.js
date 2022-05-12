const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const {Doctor, rateDoctor} = require("../models/doctor");

const Review = mongoose.model('Review', new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  },

  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  rate: {
      type: int
  },
  text: {
    type: string
}
  
}));

async function createReview(patientid, doctorid, rate, text){
  let doctor = await Doctor.findById(doctorid);
  let rateOld = doctor.rate;
  let n = await Review.count(doctorid);
  rateNew = (n * rateOld + rate)/(n+1)
  rateDoctor(doctorid, rateNew);

  let review = new Review({
    patient: patientid,
    doctor: doctorid,
    rate: rate,
    text: text
  });
  await review.save();
  console.log(result);

}

exports.Review = Review; 
exports.createReview = createReview;
