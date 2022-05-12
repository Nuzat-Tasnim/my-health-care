const express = require('express');
const { func } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  gender: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 15
  },
  birthdate: {
      type: String,
      required: true,
      maxlength: 15
  },
  address: {
    type: String
  },
  contact: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 60
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 30,
  },
  doctorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  nurseid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nurse"
  },
  patientid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient"
  }
}));

function validatePost(user) {
  const schema = {
    name: Joi.string().min(2).max(50).required(),
    gender: Joi.string().min(4).max(15).required(),
    birthdate: Joi.string().max(15).required(),
    address: Joi.string(),
    contact: Joi.string().min(5).max(50),
    email: Joi.string().email().min(6).max(60),
    password: Joi.string().min(6).max(30)
  };

  return Joi.validate(post, schema);
}

async function createUser(name, gender, birthdate, address, contact, email, password){
  let user = new User({
    name: name,
    gender: gender,
    birthdate: birthdate,
    address: address,
    contact: contact,
    email: email,
    password: password,
    doctorid: null,
    nurseid: null,
    patientid: null
  });
  let result = await user.save();
  console.log(user, result);
  return user
}

async function editUser(user, name, gender, birthdate, address, contact){
  user.name = name;
  user.gender = gender,
  user.birthdate = birthdate
  user.address = address
  user.contact = contact
 
  let result = await user.save();
  console.log(result);
  return user;
}

async function getUsers() {
  let users = await User.find().sort("name");
  console.log("list of users:", users);
  return users;
}

async function getUserById(userid) {
  let user = await User.findById(userid);
  console.log("User: ", user);
  return user;
}

// async function getUserNames(userids) {
//   let usersMap = new Map()
//   userids.forEach((userid) => {
//     let name = await User.findById(userid).select('name');
//     usersMap.set(userid, name)
//   })
//   return usersMap;
// }

async function searchUser(name, category){
  let idKey = category+"id";
  let users = await User.find({
      [idKey]: {$ne : null},
      "name": { $regex: name, $options: "i" } 
  });
  
  return users;
  
}

async function removeUser(user) {
  user.remove();
}

exports.User = User; 
exports.createUser = createUser;
exports.editUser = editUser;
exports.searchUser = searchUser;
exports.getUsers = getUsers
exports.getUserById = getUserById
// exports.getUserNames = getUserNames;
exports.removeUser = removeUser

