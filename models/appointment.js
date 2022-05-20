const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  },
  date: {
    type: Date
  },
  serial: {
    type: Number
  }
  
}));

async function createAppointment(doctorid, patientid, year, month, day){
  try{
    let appointment = new Appointment({
      doctor: doctorid,
      patientid: patientid,
      date: new Date(year, month, day)
    });
    appointment = await appointment.save();
    return appointment;
  }
  catch(err){ return null; }
}

async function getAppointmentById(appointmentId){
  let appointment = await Appointment.findById(appointmentId);
  return appointment
}

async function getAppointmentByQuery(query){
  try{
    let appointments = await Appointment.find(query);
    return appointments;
  }
  catch(err){ return null; }
}

// // for doctor, to search My Appointments
// async function getAppointmentByDoctorId(doctorid){
//   try{
//     let appointments = await Appointment.find({'doctorid': doctorid});
//     return appointments;
//   }
//   catch(err){ return null; }
// }

// async function getAppointmentByPatientid(patientid){
//   try{
//     let appointments = await Appointment.find({'patientid': patientid});
//     return appointments;
//   }
//   catch(err){ return null; }
// }

exports.createAppointment = createAppointment; 
exports.getAppointmentById = getAppointmentById;
exports.getAppointmentByQuery = getAppointmentByQuery;

// exports.getAppointmentByDoctorId = getAppointmentByDoctorId;
// exports.getAppointmentByPatientid = getAppointmentByPatientid;

