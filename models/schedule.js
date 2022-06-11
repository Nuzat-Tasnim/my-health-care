const mongoose = require('mongoose');

const Schedule = mongoose.model('Schedule', new mongoose.Schema({
    from: { type: String },
    to: { type: String },
    days: [{ type: Number }],
    maxAppointment: { type: Number }
}));

async function createSchedule(from, to, days, maxAppointment){

    let week = ['sunday', 'monday','tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

    for (let i=0;i<days.length;i++){
        days[i]=week.indexOf(days[i]);
    }
    days.sort();

    console.log(days);
    try{
    let schedule = new Schedule({
      from: from,
      to: to,
      days: days,
      maxAppointment: maxAppointment
    });
    schedule = await schedule.save();
    return schedule;
  }
  catch(err){ 
      console.log(err);
      return null; }
}

async function getSchedule(scheduleid){
    let schedule = await Schedule.findById(scheduleid);
    return schedule;
}


async function removeSchedule(schedule){
    try{ 
        schedule = await schedule.remove();
        return schedule;
    }
    catch(err) { return null }
}

function validate(from, to, days, maxAppointment){
    if(from<0 || from>23) return 'Invalide time in the "From" field.';
    if(to<0 || to>23) return 'Invalide time in the "To" field.';

    days.sort();
    if(days.length<1 || days.length>7) return "Please select the weekdays correctly."

    let prev = days[0];
    for (let i=1; i<days.length; i++){
        if(days[i] === days[i-1]) return "Please select the weekdays correctly." 
    }
    if(maxAppointment<0) return "The number for maximum patient is wrong."
    return true;
}

// function getWeekDays(){
//     // const daysMap = new Map();
//     // daysMap.set('thursday', 0);
//     // daysMap.set('friday', 1);
//     // daysMap.set('saturday', 2);
//     // daysMap.set('sunday', 3);
//     // daysMap.set('monday', 4);
//     // daysMap.set('tuesday', 5);
//     // daysMap.set('wednesday', 6);
//     weekdays = ['sunday', 'monday','tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ]
//     return weekdays;
// }


exports.Schedule = Schedule; 
exports.createSchedule = createSchedule;
exports.getSchedule = getSchedule;
exports.removeSchedule = removeSchedule;
exports.getWeekDays = getWeekDays;
exports.validate = validate;
