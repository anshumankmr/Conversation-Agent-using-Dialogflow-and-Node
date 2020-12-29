let responseMap = {};
// let welcomeResponse = new Array("Hi, Welcome to iFixit's Phone Repair Solutions!!! I am here to assist you to help you fix your smart phone.",   
//                        "Hello and Welcome to iFixit's Phone Repair Solutions!!! I am here to assist in you to do whatever it takes to  fix your smart phone.",
//                        "Hey, Welcome to iFixit's Phone Repair Solutions!!! I am here to assist you to fix your smart phone.");
let welcomeResponse = new Array("Hi, Welcome to iFixit's Phone Repair Solutions!!! I am here to assist you to help you fix your smart phone.",
                                "What phone do you use?");
let fallbackResponse;





// responseMap.set('welcome', welcomeResponse);
responseMap["welcome"] = welcomeResponse;
// console.log("HELLO");
console.log(welcomeResponse instanceof Array);
module.exports = responseMap;
 