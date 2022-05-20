const mongoose = require('mongoose');

const { addRoles } = require("../models/user");

const Admin = mongoose.model('Admin', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  log: [{type: String}]
  
}));

async function createAdmin(userid){
  try{
    let admin = new Admin({userid: userid, log: []});
    admin = await admin.save();

    let user = await addRoles(user, "Admin", admin._id, "adminid");
    if(!user) return null;

    return admin;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

async function getAdmin(adminid){
  let admin = await Admin.findById(adminid);
  return admin;
}

async function logEntry(text, admin){
  // let d = new Date();
  // let date = d.toString();
  // text = text + "\t" + date;
  text += "\t"+ new Date().toString();
  admin.log.push(text);
  admin = await admin.save()
  return admin;
};

async function logs(adminid){
  let admin = await Admin.findById(adminid);
  return admin.log;
}

exports.createAdmin = createAdmin
exports.getAdmin = getAdmin;
exports.logEntry = logEntry;
exports.logs = logs;

