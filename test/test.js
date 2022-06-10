Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

var date = new Date();

console.log(date.addDays(5));




// // String.prototype.hashCode = function() {
// //     var hash = 0, i, chr;
// //     if (this.length === 0) return hash;
// //     for (i = 0; i < this.length; i++) {
// //       chr   = this.charCodeAt(i);
// //       hash  = ((hash << 5) - hash) + chr;
// //       hash |= 0; // Convert to 32bit integer
// //     }
// //     return hash;
// // }

// let x = "turna123";
// console.log(x.hashCode());

// const CryptoJS = require ("crypto-js");
// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
// console.log(encrypted, decrypted);




// const CryptoJS = require("crypto-js");

// let obj = {"id": 123, "name": "turna", "age": 12};

// let x = obj.entries;
// for (element in x){
//   console.log(obj[i]);
//   // Encrypt
//   let ciphertext = CryptoJS.AES.encrypt(element, config.get('jwtPrivateKey')).toString();

//   // Decrypt
//   let bytes  = CryptoJS.AES.decrypt(ciphertext, config.get('jwtPrivateKey'));
//   let originalText = bytes.toString(CryptoJS.enc.Utf8);

//   console.log(ciphertext);
//   console.log(originalText); // 'my message'
// }



//// Finalssssssssssss

// const CryptoJS = require("crypto-js");
// const config = require("config");

// function encryption(obj){
// //   for (element in obj){
//     // if(typeof(element) != "string" && typeof(element) != "number"){ 
//     //   console.log("ignoring ", typeof(element));
//     //   continue;
//     //  }
//     let ciphertext = CryptoJS.AES.encrypt(obj, config.get('jwtPrivateKey')).toString();
    
//     let bytes = CryptoJS.AES.decrypt(ciphertext, config.get('jwtPrivateKey'));
//     let originalText = bytes.toString(CryptoJS.enc.Utf8);
  
//     // obj[element] = ciphertext;
//     console.log(ciphertext, originalText, "printed");
//     // console.log(originalText); // 'my message'
  
//   return obj;
// }
// let obj = {"id": 123, "name": "turna", "age": 12};

// encryption("hello");

// console.log(CryptoJS.SHA256("password").toString());



// // reminderrrrrrr!!
// const schedule = require('node-schedule');
// const date = new Date("2022-05-27T08:27:00.000Z");

// const job = schedule.scheduleJob(date, function(){
//   console.log('The world is going to end today.');
// });



// const CryptoJS = require("crypto-js");
// const config = require("config");
// const { object } = require("joi");

// let obj = {"id": 12, "name": "turna", "age": 12};

// function encrypt(object){
    
//     for(attribute in object){
//         let value = object[attribute];
//         if(typeof(value) != "string") continue;
//         // Encrypt
//         let ciphertext = CryptoJS.AES.encrypt(value, config.get('jwtPrivateKey')).toString();
    
//         // // Decrypt
//         // let bytes  = CryptoJS.AES.decrypt(ciphertext, config.get('jwtPrivateKey'));
//         // let originalText = bytes.toString(CryptoJS.enc.Utf8);
    
//         // console.log(value, iphertext);
//         // console.log(originalText);
        
//         object[attribute] = ciphertext;
//     }
//     return object;
// }

// function decrypt(object){
    
//     for(attribute in object){
//         let ciphertext = object[attribute];
//         if(typeof(ciphertext) != "string") continue;
//         // // Encrypt
//         // let ciphertext = CryptoJS.AES.encrypt(value, config.get('jwtPrivateKey')).toString();
    
//         // Decrypt
//         let bytes  = CryptoJS.AES.decrypt(ciphertext, config.get('jwtPrivateKey'));
//         let value = bytes.toString(CryptoJS.enc.Utf8);

//         object[attribute] = value;
    
//         // console.log(value, ciphertext);
//     }

//     return object;
// }

// function compare(obj1, obj2){
    
//     for(attribute in obj1){
//         if(obj1[attribute] != obj2[attribute]) return false;
//     }
//     return true;
// }

// // let obj1 = encrypt(obj);
// console.log(encrypt({"a":"bah bah"}), "\n", encrypt({"a":"bah bah"}), "\n", encrypt({"a":"bah bah"}));
// // let obj2 = decrypt(obj1);
// // console.log(obj2);
// // console.log(compare(obj, obj2));



// console.log(new Date());






// {
//   "users": [
//       {
//           "name": "admin",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "admin@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "doctor",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "doctor@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "doctor2",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "doctor2@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "doctor3",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "doctor3@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "doctor4",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "doctor4@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "doctor5",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "doctor5@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "nurse",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "nurse@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "nurse2",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "nurse2@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "nurse3",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "nurse3@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
//       },
//       {
//           "name": "patient",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "patient@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "patient2",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "patient2@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
//       },
//       {
//           "name": "patient3",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "patient@3gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "patient4",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "patient4@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user2",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user2@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user3",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user3@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user4",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user4@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user5",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user5@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user6",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user6@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user7",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user7@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user8",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user8@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user9",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user9@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       },
//       {
//           "name": "user1",
//           "gender": "male",
//           "birthdate": "2008-08-08",
//           "address": "ctg",
//           "contact": "01738456774",
//           "email": "user1@gmail.com",
//           "password": "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8",
//           "doctorid": null,
//           "nurseid": null,
//           "patientid": null,
//           "adminid": null
//       }

//   ]
// }


// {
//   "doctors": [
//       {
//           "userid": "62a3a718ad58ceafa2bc0269",
//           "areaOfExpertise": "mental",
//           "approvedBy": null
//       },
//       {
//           "userid": "62a3a718ad58ceafa2bc026a",
//           "areaOfExpertise": "hair",
//           "approvedBy": null
//       },
//       {
//           "userid": "62a3a718ad58ceafa2bc026b",
//           "areaOfExpertise": "heart",
//           "approvedBy": null
//       },
//       {
//           "userid": "62a3a718ad58ceafa2bc026c",
//           "areaOfExpertise": "bone",
//           "approvedBy": null
//       }
//   ]
// }