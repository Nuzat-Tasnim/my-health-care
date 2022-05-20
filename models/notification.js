const mongoose = require('mongoose');

const {User} = require("../models/user");

const Notification = mongoose.model('Notification', new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  text: { type: String},
  link: { type: String},
  seen: { type: Boolean }
}));

async function createNotification(userid, text, link){
    let notification = new Notification({
        userid: userid,
        text: text,
        link: link,
        seen: false
    });
    notification = await notification.save();
    return notification;
}

async function userUnseenNotification(userid){
    let notifications = await Notification.find({'userid': userid, 'seen':false});
    return notifications;
}

async function userSeenNotification(userid){
    let notifications = await Notification.find({'userid': userid, 'seen':true});
    return notifications;
}

async function userHasSeenNotification(notificationid){
  let notification = await Notification.findById(notificationid);
  notification.seen = true;
  await notification.save();
}