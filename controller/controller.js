const  crudController = require("../services/services");
const  statusUtil = require("../utils/status");
const createOne = model => async (req, res) => 
{
    const queryModel = req.body;
    const doc = await crudController.insertOne(model,queryModel)
    return statusUtil(res,doc);
}
const readOne = model => async (req, res) => 
{
   console.log(req.body);
   const doc = await crudController.getOne(model,req.body);   
   return statusUtil(res,doc);
}
const readMany = model => async (req, res) => 
{
   console.log(req.body);
   const doc = await crudController.getMany(model,req.body);   
   return statusUtil(res,doc);
}
const updateOne = model => async (req, res) => 
{
   const doc = await crudController.updateOne(model,req.body);   
   return statusUtil(res,doc);
}
const deleteOne = model => async (req, res) => 
{
   const doc = await crudController.removeOne(model,req.body);   
   return statusUtil(res,doc);
}
const api = (req,res) =>
{
  let { WebhookClient } = require('dialogflow-fulfillment');
  let createIntentMap = require("../utils/intentHandler");
  let agent = new WebhookClient({ request: req, response: res });
  let intentMap = createIntentMap(agent);
  agent.handleRequest(intentMap);
};
const getHealth = (req,res) =>
{
  res.send("Server Health Looks Okay. We are good to go." );
};
const cntrl = {createOne: createOne, readOne : readOne, updateOne : updateOne, deleteOne : deleteOne ,api : api , getHealth : getHealth }
module.exports = cntrl;