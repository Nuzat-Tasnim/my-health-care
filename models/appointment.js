const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const { getUserById } = require("./user");
const { getSchedule } = require("./schedule");
const { getDoctor, getDoctorWithName } = require("./doctor");
const { getPatient } = require("./patient");

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  },
  doctorname: { type: String },
  patientname: { type: String },
  date: { type: String },
  serial: { type: Number },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Schedule"
  }
  
}));

async function createAppointment(doctorid, patientid, year, month, day){

  let count = 1;
  let date = new Date(year, month-1, day).toLocaleDateString();

  try{
    count += await Appointment.count({"doctor": doctorid, "date": date});
  }
  catch(err){ return null; }
  let doctorname="", patientname = "", schedule = "";
  try{
    let doctor = await getDoctorWithName(doctorid);
    // let doctor = await getDoctor(doctorid);
    // doctor = await getUserById(doctor.userid);
    // console.log(doctor);
    doctorname = doctor.userid.name;
    schedule = doctor.schedule;
    // console.log(doctor);
    // console.log(doctor.schedule);

    let patient = await getPatient(patientid);
    patient = await getUserById(patient.userid);
    patientname = patient.name;

  }
  catch(err){
    console.log(err);
    return null;
  }

  try{
    let appointment = new Appointment({
      doctor: doctorid,
      doctorname: doctorname,
      patient: patientid,
      patientname: patientname,
      date: date,
      schedule: schedule,
      serial: count
    });
    appointment = await appointment.save();
    // console.log("saved appointment");
    // console.log(appointment);

    let patient = await getPatient(patientid);
    if(!(patient.myDoctors.includes(doctorid))) patient.myDoctors.push(doctorid);
    await patient.save();

    return appointment;
  }
  catch(err){ return null; }
}

async function getAppointmentById(appointmentId){
  let appointment = await Appointment.findById(appointmentId);
  return appointment;
}

async function getAppointmentByQuery(query){
  try{
    let appointments = await Appointment.find(query);
    return appointments;

  }
  catch(err){ return null; }
}

async function getAppointmentScheduleByQuery(query){
  try{
    let appointments = await Appointment.find(query).populate({path: "schedule", select: "to from"});
    // console.log(query);
    // console.log(appointments);
    return appointments;

  }
  catch(err){ return null; }
}

async function validate(doctor, patientid, year, month, day){

    let date = new Date(year, month-1, day).toLocaleDateString();
    doctorSchedule = await getSchedule(doctor.schedule);

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

async function getAppointmentWithSchedule(appointmentId){
  let appointment = await Appointment.find(appointmentId).populate({path: "schedule", select: "to from"});
  return appointment;
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
exports.getAppointmentScheduleByQuery = getAppointmentScheduleByQuery;
exports.validate = validate;

// exports.getAppointmentByDoctorId = getAppointmentByDoctorId;
// exports.getAppointmentByPatientid = getAppointmentByPatientid;

