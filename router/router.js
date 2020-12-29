const express = require('express')
// const userModel = require('../models/userModel.js')
const queryModel = require("../models/queryModel.js")

const controller = require("../controller/controller");
// const { remoteConfig } = require('firebase-functions');
const router = express.Router();
router.route("/",express.json)
    .post(controller.api)
    .get(controller.api);
router.route("/serverHealth")
    .get(controller.getHealth);
router.route("/user")
       .get(controller.getHealth)
       .post(controller.getHealth)
       .put(controller.getHealth)
       .delete(controller.getHealth);
router.route("/query")
       .get(controller.readOne(queryModel))
       .post(controller.createOne(queryModel))
       .put(controller.updateOne(queryModel))
       .delete(controller.deleteOne(queryModel));

module.exports  = router;