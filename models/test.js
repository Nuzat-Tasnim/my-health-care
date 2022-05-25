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

// // let x = "turna123";
// // console.log(x.hashCode());

// // const CryptoJS = require ("crypto-js");
// // var encrypted = CryptoJS.Rabbit.encrypt("Message", "Secret Passphrase");
// // ​
// // var decrypted = CryptoJS.Rabbit.decrypt(encrypted, "Secret Passphrase");





// const config = require("config");
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

// // function encryption(obj){
// //   for (element in obj){
// //     if(typeof(element) != "string" && typeof(element) != "number"){ 
// //       console.log("ignoring ", typeof(element));
// //       continue;
// //      }
// //     let ciphertext = CryptoJS.AES.encrypt(obj[element], config.get('jwtPrivateKey')).toString();
  
// //     obj[element] = ciphertext;
// //     console.log(ciphertext);
// //     // console.log(originalText); // 'my message'
// //   }
// //   return obj
// // }
// // console.log(encryption(obj));





// console.log(CryptoJS.SHA256("Message").toString());



// // // reminderrrrrrr!!
// // const schedule = require('node-schedule');
// // const date = new Date(2022, 4, 23, 23, 43, 0);

// // const job = schedule.scheduleJob(date, function(){
// //   console.log('The world is going to end today.');
// // });


