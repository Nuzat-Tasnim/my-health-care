const mongoose = require('mongoose');

const { addRoles } = require("../models/user");

const Admin = mongoose.model('Admin', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  log: [{type: String}]
  
}));

async function createAdmin(user){
  try{
    let admin = new Admin({userid: user._id, log: []});
    admin = await admin.save();

    user = await addRoles(user, "Admin", admin._id, "adminid");
    if(!user) return null;

    return admin;
  }
  catch(err){
    console.log(err);
    return null;
  }
};

async function approveAdmin(admin, adminid){
  admin.approvedBy = adminid;
  let user = await getUserById(admin.userid);
  user = await addRoles(user, "Admin", admin._id, "adminid");
  if(!user) return null;

  try{
    admin = await admin.save(); 
    return admin;
  }
  catch(err){
    console.log(err);
    return null;
  }
}

async function getUnapprovedAdminList(){
  let adminList = await Admin.find({approvedBy: { $eq: null }});
  return adminList;
}

async function getAdmin(adminid){
  let admin = await Admin.findById(adminid);
  return admin;
}

async function logEntry(text, admin){
  text += "\t"+ new Date().toLocaleDateString();
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
exports.approveAdmin = approveAdmin;
exports.getUnapprovedAdminList = getUnapprovedAdminList;
exports.logEntry = logEntry;
exports.logs = logs;

