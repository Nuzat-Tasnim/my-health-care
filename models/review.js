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
      type: Number
  },
  text: {
    type: String
}
  
}));

async function createReview(doctor, patientid, rate, text){

  let rateOld = doctor.rate;
  let n = await Review.count(doctorid);
  rateNew = (n * rateOld + rate)/(n+1);
  doctor = await rateDoctor(doctorid, rateNew);
  if(doctor.rate != rateNew) return "500";

  try{
    let review = new Review({
      patient: patientid,
      doctor: doctorid,
      rate: rate,
      text: text
    });
    review = await review.save();
    if(review) return doctor;
  }
  catch(error){
    console.log(error);
    return "500";
  }

}

exports.Review = Review; 
exports.createReview = createReview;
