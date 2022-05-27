const CryptoJS = require("crypto-js");
const config = require("config");
const { object } = require("joi");

let obj = {"id": 12, "name": "turna", "age": 12};

// function encrypt(object){
//     for(attribute in object){
//         let value = object[attribute];
//         if(typeof(value) != "string") continue;
        
//         // Encrypt
//         let ciphertext = CryptoJS.AES.encrypt(value, config.get('jwtPrivateKey')).toString();

//         object[attribute] = ciphertext;
//     }
//     return object;
// }

function encryptString(value){

    return CryptoJS.AES.encrypt(value, config.get('jwtPrivateKey')).toString();
}

// function decrypt(object){
//     console.log("in aes, d1 ", object);
//     for(attribute in object){
//         let ciphertext = object[attribute];
//         if(typeof(ciphertext) != "string") continue;
//         if(attribute === "id") continue;
// console.log("-----------", attribute, object[attribute], typeof object[attribute]);
//         // Decrypt
//         let bytes  = CryptoJS.AES.decrypt(ciphertext, config.get('jwtPrivateKey'));
//         let value = bytes.toString(CryptoJS.enc.Utf8);
// console.log(value);
//         object[attribute] = value;
//     }
//     console.log("in aes, d2 ", object);
//     return object;
// }
function decryptString(ciphertext){
    
    let bytes  = CryptoJS.AES.decrypt(ciphertext, config.get('jwtPrivateKey'));
    let value = bytes.toString(CryptoJS.enc.Utf8);
    return value;
}

function compare(obj1, obj2){
    
    for(attribute in obj1){
        if(obj1[attribute] != obj2[attribute]) return false;
    }
    return true;
}

function hash(password){
   return CryptoJS.SHA256(password).toString();
}

// let obj1 = encrypt(obj);
// console.log(obj1);
// let obj2 = decrypt(obj1);
// console.log(obj2);
// console.log(compare(obj, obj2));

// exports.encrypt = encrypt;
exports.encryptString = encryptString;
// exports.decrypt = decrypt;
exports.decryptString = decryptString;
exports.hash = hash;