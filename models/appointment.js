const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const { getSchedule } = require("./schedule")

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
      patient: patientid,
      date: new Date(year, month, day)
    });
    appointment = await appointment.save();

    //
    // Set reminder here.
    //
console.log(patientid);
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

async function validate(doctor, patientid, year, month, day){
  let date = new Date(year,month,day);
  doctorSchedule = await getSchedule(doctor.schedule);

  let result = doctorSchedule.days.includes(date.getDay());
  if(!result) return false;

  try{
    let appointment = await Appointment.findOne({"doctor": doctor._id, "patient": patientid});
    if(appointment) return false;
  }
  catch(err){
    return null;
  }

  let appointmentsTaken=0;

  try{
    appointmentsTaken = await Appointment.count({"doctor": doctor._id, "date": date});
  }
  catch(err){
    return null;
  }

  if(appointmentsTaken < doctorSchedule.maxAppointment) return appointmentsTaken+1;
  else return false;
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
exports.Appointment = Appointment;
exports.createAppointment = createAppointment; 
exports.getAppointmentById = getAppointmentById;
exports.getAppointmentByQuery = getAppointmentByQuery;
exports.validate = validate;

// exports.getAppointmentByDoctorId = getAppointmentByDoctorId;
// exports.getAppointmentByPatientid = getAppointmentByPatientid;

