//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Query = require('../models/queryModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
server = server.app;
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Queries', () => 
{
    // beforeEach((done) => { //Before each test we empty the database
    //     Query.remove({}, (err) => {
    //        done();
    //     });
    // });
/*
  * Test the /GET route
  */
 
  
  describe('/GET serverHealth', () => {
    it('it should GET a string indicating the server is functioning fine', (done) => {
      chai.request(server)
          .get('/serverHealth')
          .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  let data = {
  
    "model": "XR",
    "brand": "iPhone",
    "issue": "Battery sucks"
  };
  describe('/GET query', () => {
    it('it should GET a a single query ', (done) => {
      chai.request(server)
          .get('/query')
          .query(data)
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.model.should.be.eql("XR");
                res.body.brand.should.be.eql("iPhone");
                res.body.issue.should.be.eql("Battery sucks");
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});