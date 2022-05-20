const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require("config");
const mongoose = require('mongoose');
const res = require('express/lib/response');
const { query } = require('express');

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  console.log("hashcode ",hash);
  return hash.toString();
}
const userSchema = new mongoose.Schema({
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
      type: Date,
      required: true,
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
  },
  adminid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  roles: [{
      type: String
    }]
});

userSchema.methods.generateAuthToken = function() {
  const data = {
    _id: this._id,
    doctorid: this.doctorid,
    nurseid: this.nurseid,
    patientid: this.patientid,
    adminid: this.adminid,
    roles: this.roles
  }
  const token = jwt.sign(data, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validate(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    gender: Joi.string().min(4).max(15).required(),
    year: Joi.number(),
    month: Joi.number(),
    date: Joi.number(),
    address: Joi.string(),
    contact: Joi.string().min(5).max(50),
    email: Joi.string().email().min(6).max(60),
    password: Joi.string().min(6).max(30)
  });
  let x = schema.validate(user, (err, value) => { console.log(err, value) });
  console.log(x);
  return x;
}

async function createUser(name, gender, year, month, date, address, contact, email, password){
  let user = new User({
    name: name,
    gender: gender,
    birthdate: new Date(year, month, date),
    address: address,
    contact: contact,
    email: email,
    password: password.hashCode(),
    doctorid: null,
    nurseid: null,
    patientid: null,
    adminid: null,
    roles: []
  });
  user = await user.save();
  console.log(user);
  return user
}

async function login(email, password){
  let user = await User.findOne({'email': email});
  if(user && user.password === password.hashCode()){
    return user;
  }
  else return null;
}

async function editUser(user, name, gender, birthdate, address, contact){
  user.name = name;
  user.gender = gender;
  user.birthdate = birthdate;
  user.address = address;
  user.contact = contact;

  let {error} = validate({
    name: user.name,
    gender: user.gender,
    birthdate: user.birthdate,
    address: user.address,
    contact: user.contact,
    email: user.email,
    password: user.password
  });
  if(error) return error.details[0].message;

  user = await user.save();
  return user;
}

async function addRoles(user, role, id, idKey){
  try{
    user.roles.push(role);
    user[idKey] = id;
    user = await user.save();
    return user;
  }
  catch(err){ 
    console.log(err);
    return null; 
  }
}

async function getUsers() {
  let users = await User.find().sort("name");
  console.log("list of users:", users);
  return users;
}

async function getUserById(userid) {
  try{
    let user = await User.findById(userid);
    return user;
  }
  catch(error){
    console.log(error);
    return null;
  }
  
}

async function searchUser(name, category){
  const categories = ['doctor','nurse','patient'];
  if(category in categories === false) res.status(400).send("Bad request.");
  
  let idKey = category+"id";
  let users = await User.find({
      [idKey]: {$ne : null},
      "name": { $regex: name, $options: "i" } 
  });
  
  return users;
  
}

async function removeUser(user) {
  try{
    let result = await user.remove();
    console.log(result);
    return result;
  }
  catch(error){
    console.log(error);
    return null;
  }
}

exports.User = User; 
exports.createUser = createUser;
exports.validate = validate;
exports.login = login;
exports.addRoles = addRoles;
exports.editUser = editUser;
exports.searchUser = searchUser;
exports.getUsers = getUsers
exports.getUserById = getUserById
exports.removeUser = removeUser

