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

// console.log(CryptoJS.SHA256("Message").toString());



// reminderrrrrrr!!
const schedule = require('node-schedule');
const date = new Date("2022-05-27T08:27:00.000Z");

const job = schedule.scheduleJob(date, function(){
  console.log('The world is going to end today.');
});



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



console.log(new Date());