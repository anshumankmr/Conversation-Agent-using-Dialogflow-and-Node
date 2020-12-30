const { get } = require("../router/router");
let responseMap = require("../utils/responseHandler");
const  crudController = require("../services/services");
const queryModel = require("../models/queryModel.js")

function createIntentMap(agent)
{
 let intentMap = new Map();
 function welcome() 
 {
    agent.add(responseMap.welcome);   
 }
 function fallback()
 {
     agent.add("I don't get what you are saying. Could you please repeat?");
 }
 function chooseBrand()
 {
    //  console.log(agent.parameters);
     if (agent["query"].toLowerCase().includes("iphone"))
     {
        let context = {
                        'name': 'applecare', 'lifespan': 2, 
                        'parameters': 
                        { 
                            'model':  agent["parameters"]["model"] ,
                            "brand" : agent.parameters.smartphone
                        }
                      };
        console.log("THIS IS THE CONTEXT ",context);
        if (agent["parameters"]["model"] != "")
        {
            agent.add("I see that you have an iPhone and your model is "+ agent["parameters"]["model"]);
            agent.add("Dont' worry. We can help you get it repaired");
            agent.add("Please let me know if you have Apple Care.");
            agent.add("In case you don't know whether you have Apple Care, check this link here : https://checkcoverage.apple.com/");
            agent.add("It will require your serial number, it may be on the surface of your iPhone or you can find it on your iTunes.");
            agent.setContext(context);
        }
        else 
        {
            agent.add("I see that you have an iPhone.");
            agent.add("We can help you get it repaired");
            agent.add("But first, tell me the model of your iPhone.");
            context["name"] = "getapplemodel";
            agent.setContext(context);
        }
     }
     else
     {
        let context = {
                       'name': 'getissue', 'lifespan': 5, 
                       'parameters': 
                       {
                        'model':  agent["parameters"]["model"],  
                        "brand" : agent["parameters"]["smartphone"] 
                       }
                      };
        console.log("THIS IS THE CONTEXT ",context);
        if (agent["parameters"]["model"] != "")
        {
            agent.add("I see that you are using an Android smartphone and your model is "+ agent["parameters"]["smartphone"]+ " " + agent["parameters"]["model"]);
            agent.add("Dont' worry. We can help you get it repaired");
            agent.setContext(context);
            agent.add("Tell me your issue.");

        }
        else 
        {
            agent.add("I see that you are using a  " +  agent["parameters"]["brand"] +" smartphone.");
            agent.add("We can help you get it repaired");
            agent.add("Tell me the model of your smartphone.");
            context["name"] = "getandroidmodel";
            agent.setContext(context);
        }
     }
 }
 function getAppleModel()
 {
    //  console.log(agent.parameters);
     agent.add("Got it. You have an iPhone " + agent.parameters.model);
     agent.add("Please tell me if you have Apple Care.");
     agent.add("In case you don't know whether you have Apple Care, check this link here : https://checkcoverage.apple.com/");
     agent.add("It will require your serial number, it may be on the surface of your iPhone or you can find it on your iTunes.");
     let context = {
                    'name': 'applecare', 'lifespan': 2, 
                    'parameters': 
                     { 
                        'model':  agent["parameters"]["model"] , 
                        "brand" : "iPhone"  
                     }
                   };
     agent.setContext(context);
 }
 function getAndroidModel()
 {
    let context = {
        'name': 'getissue', 
        'lifespan': 2, 
        'parameters': 
        { 
            'model': agent['parameters']["model"],
            'brand': agent['parameters']["brand"]
        }
      };
    //  console.log("Hello There",context);
     agent.add("Alright. Describe to use your problem");
     agent.setContext(context);
 }
 function checkAppleCare()
 {
     let response = agent.query;
     response = response.toLowerCase();
     console.log(agent.getContext("applecare"));
     if (response.includes("no") || response.includes("don't") || response.includes("do not"))
     {
        let context = {
                        'name': 'getissue', 
                        'lifespan': 2, 
                        'parameters': 
                        { 
                            'model': agent.getContext("applecare")["parameters"]["model"],
                            'brand': agent.getContext("applecare")["parameters"]["brand"]
                        }
                      };
        agent.add("Good we will proceed further with to fix your  " + agent.getContext("applecare")["parameters"]["brand"] + " " + agent.getContext("applecare")["parameters"]["model"] );
        agent.add("Alright. Describe to us your problem");
        agent.setContext(context);
        // Proceed to Fetch Address Details
    }
     else
     {
        agent.add("Okay. You have Apple Care");
        agent.add("Since we are third party repair company, I believe it would be best if you call Apple Care to handle your repairs");
        //
        // END OF CONVERSATION
        //
    }
 }
 async function getIssue()
 {
     console.log(agent.getContext("getissue"));
     let context = {
                    'name' : 'getUserDetails' ,
                    'lifespan': 2, 'parameters': 
                    { 
                        'model':  agent.getContext("getissue")["parameters"]["model"],
                        'brand': agent.getContext("getissue")["parameters"]["brand"][0],
                        'issue': agent["query"]
                    }
                };
    agent.add("I see. I am sorry to hear that.");
    agent.setContext(context);
    const doc = await crudController.insertOne(queryModel,context["parameters"]);   
    try {
        agent.add("Here is your reference ID. Please note it down as our agent will ask it from you when we send them to collect your phone");
        agent.add(doc["id"]);
    }
    catch(e)
    {
        console.error(e);
    }
 }
 function getUserDetails()
 {
    //enter the user details here
 }
 intentMap.set('Default Welcome Intent', welcome);
 intentMap.set("Default Fallback Intent",fallback);
 intentMap.set("welcome.choose_brand",chooseBrand);
 intentMap.set("getAppleModel",getAppleModel);
 intentMap.set("getAndroidModel",getAndroidModel);  
 intentMap.set("checkAppleCare",checkAppleCare);
 intentMap.set("getIssue",getIssue);  
 return intentMap;
}
module.exports = createIntentMap;// : createIntentMap;