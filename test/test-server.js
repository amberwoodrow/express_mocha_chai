process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server/app');
var Frog = require("../server/models/frog");

var should = chai.should();
chai.use(chaiHttp);


describe('Frogs', function() {

  Frog.collection.drop();

  beforeEach(function(done){
    var newFrog = new Frog({
      name: 'John',
      favFlyMeal: 'flySoup'
    });
    newFrog.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Frog.collection.drop();
    done();
  });

  it('should list ALL frogs on /frogs GET', function(done) {
    chai.request(server)
      .get('/frogs')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.frogs.should.be.a('array');
        res.body.frogs.length.should.equal(1);
        res.body.frogs[0].should.have.property('_id');
        res.body.frogs[0].should.have.property('name');
        res.body.frogs[0].should.have.property('favFlyMeal');
        res.body.frogs[0].name.should.equal('John');
        res.body.frogs[0].favFlyMeal.should.equal('flySoup');
        done();
      });
  });


  it('should list a SINGLE frog on /frog/<id> GET', function(done) {
      var newFrog = new Frog({
        name: 'John',
        favFlyMeal: 'flySoup'
      });
      newFrog.save(function(err, data) {
        chai.request(server)
          .get('/frog/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.frog.should.have.property('_id');
            res.body.frog.should.have.property('name');
            res.body.frog.should.have.property('favFlyMeal');
            res.body.frog.name.should.equal('John');
            res.body.frog.favFlyMeal.should.equal('flySoup');
            res.body.frog._id.should.equal(data.id);
            done();
          });
      });
  });



  it('should add a SINGLE frog on /frogs POST', function(done) {
    chai.request(server)
      .post('/frogs')
      .send({'name': 'John', 'favFlyMeal': 'flySoup'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('favFlyMeal');
        res.body.should.have.property('_id');
        res.body.name.should.equal('John');
        res.body.favFlyMeal.should.equal('flySoup');
        done();
      });
  });


  it('should update a SINGLE frog on /frog/<id> PUT', function(done) {
    chai.request(server)
      .get('/frogs')
      .end(function(err, res){
        chai.request(server)
          .put('/frog/'+res.body.frogs[0]._id)
          .send({'name': 'LongJohn', 'favFlyMeal': 'flySoup'})
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('name');
            response.body.should.have.property('_id');
            console.log(response.body)
            response.body.name.should.equal('LongJohn');
            done();
        });
      });
  });

  it('should delete a SINGLE frog on /frog/<id> DELETE', function(done) {
    chai.request(server)
      .get('/frogs')
      .end(function(err, res){
        chai.request(server)
          .delete('/frog/'+res.body.frogs[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('deleted');
            response.body.deleted.should.equal('true');
            done();
        });
      });
  });

});
