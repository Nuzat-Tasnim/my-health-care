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

async function createAppointment(doctorid, patientid, date){
  let appointment = new Appointment({
    doctor: doctorid,
    patientid: patientid,
    date: date
  });
  let result = await appointment.save();
  console.log(appointment,result);
}

// for doctor, to search My Appointments
async function getAppointmentByDoctorId(doctorid){
  let appointments = await Appointment.find({'doctorid': doctorid});
  return appointments;
}
async function getAppointmentByUserId(userid){
  let appointments = await Appointment.find({'userid': userid});
  return appointments;
}

// .....not sure,,, same... almost??
async function getAppointmentByDoctorIdDate(doctorid, date){
  let appointments = await Appointment.find({'doctorid': doctorid, 'date': date});
  return appointments
}

// like, you know, to view the appointment
async function getAppointmentById(appointmentId){
  let appointment = await Appointment.findById(appointmentId);
  return appointment
}

exports.createAppointment = createAppointment; 
exports.getAppointmentByDoctorId = getAppointmentByDoctorId;
exports.getAppointmentByUserId = getAppointmentByUserId;
exports.getAppointmentById = getAppointmentById;

