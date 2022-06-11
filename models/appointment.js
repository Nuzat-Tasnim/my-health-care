const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const { getSchedule } = require("./schedule");
const { Patient, getPatient } = require("./patient");

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

  if(date.includes("/")) date = date.replace(/\//g, "-");
  let count = 1;
  try{
    count += await Appointment.count({"doctor": doctorid, "date": date});
  }
  catch(err){ return null; }

  try{
    let appointment = new Appointment({
      doctor: doctorid,
      patient: patientid,
      date: new Date(date),
      serial: count
    });
    appointment = await appointment.save();

    let patient = await getPatient(patientid);
    patient.myDoctors.push(doctorid);
    await patient.save();

    //
    // Set reminder here.
    //

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

async function validate(doctor, patientid, date){
    if(date.includes("/")) date = date.replace(/\//g, "-");

    date = new Date(date);
    doctorSchedule = await getSchedule(doctor.schedule);

    let result = doctorSchedule.days.includes(date.getDay());
    console.log("includes", date.getDay());
    if(!result) return false;

    try{
      let appointment = await Appointment.findOne({"doctor": doctor._id, "patient": patientid, "date": date});
      console.log("findOne - ",appointment);
      if(appointment) return false;
    }
    catch(err){ return null; }

    let appointmentsTaken=0;
    try{
      appointmentsTaken = await Appointment.count({"doctor": doctor._id, "date": date});
      console.log("appointmentsTaken ", appointmentsTaken);
    }
    catch(err){ return null; }

    if(appointmentsTaken < doctorSchedule.maxAppointment) return true
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

