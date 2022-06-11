const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require("config");
const mongoose = require('mongoose');
const { hash } = require("../cryptoJS/aes");
const res = require('express/lib/response');

const userSchema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String },
  birthdate: { type: Date  },
  age: { type: Number },
  address: { type: String },
  contact: { type: String },
  email: { type: String },
  password: { type: String },
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
  roles: [{ type: String }]
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
    name: Joi.string().required(),
    gender: Joi.string().required(),
    birthdate: Joi.date(),
    address: Joi.string(),
    contact: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  });
  let x = schema.validate(user, (err, value) => { console.log(err, value) });
  console.log(x);
  return x;
}

async function createUser(name, gender, birthdate, email, password){
  if(birthdate.includes("/")) birthdate = birthdate.replace(/\//g, "-");
  let date = new Date(birthdate);

  let user = new User({
    name: name,
    gender: gender,
    birthdate: date,
    age: getAge(date),
    address: "",
    contact: "",
    email: email,
    password: hash(password),
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
  if(user && user.password === hash(password)){
    return user;
  }
  else return null;
}


async function editUser(user, name, gender, birthdate, address, contact){
  if(birthdate.includes("/")) birthdate = birthdate.replace(/\//g, "-");
  birthdate = new Date(birthdate);

  user.name = name;
  user.gender = gender;
  user.birthdate = birthdate;
  user.address = address;
  user.contact = contact;
console.log("1==", user);
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

  try{

    console.log("2==",user);
    user = await user.save();
    return user;
  }
  catch(err){
    return err;
  }
}

async function addRoles(user, role, id, idKey){
  try{
    console.log(user);
    user.roles.push(role);
    console.log(user);
    user[idKey] = id;
    user = await user.save();

    //token fix this one
    let token = user.generateAuthToken();
    console.log(token);
    return token;
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
  if(!categories.includes(category)) return null;
  category+="id";
  
  let idKey = category+"id";
  let users = await User.find({
      [idKey]: {$ne : null},
      "name": { $regex: name, $options: "i"}
    })
    .populate(category, {
      select: {},
      match: {"approvedBy": {$ne: null}}
    })
    .exec((err, user) =>{
      if(err){
         console.log(err)
      }else{
         console.log(user)
      }
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

function getAge(birthDate) {
  var today = new Date();
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

async function searchNotAllUsers(name){
// 
// 
// do the assigning doctorid only after admin approves
//  
// 

  let query = {
    $and: [
      {"name": new RegExp('.*'+name+'.*', 'i')},
      {
        $or: [
          { doctorid: {$ne: null} },
          { nurseid: {$ne: null} }
        ]
      }
    ]
  };

  let users = await User.find(query);

  return users;
}

async function searchAllUsers(name){
  let query = {"name": new RegExp('.*'+name+'.*', 'i')};
  let users = await User.find(query).select( "name").select("roles");
  return users;
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


exports.searchNotAllUsers = searchNotAllUsers;
exports.searchAllUsers = searchAllUsers;