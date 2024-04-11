const mongoose = require('mongoose');

const { addRoles } = require("../models/user");

const Admin = mongoose.model('Admin', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  log: [{type: String}],
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }
  
}));

async function createAdmin(userid, adminid){
  try{
    console.log("came here");
    console.log(userid, adminid);
    let admin = new Admin({userid: userid, log: [], approvedBy: adminid});
    admin = await admin.save();
    console.log(admin);

    // user = await addRoles(user, "Admin", admin._id, "adminid");
    // if(!user) return null;

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
  user = await addRoles(admin.userid, "Admin", admin._id);
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

