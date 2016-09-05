var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            })
    });
    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({
                'name': 'Kale',
            })
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            })
    });
    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/3')
            .send({
                'name': 'Ted',
            })
            .end(function(err, res) {
                res.should.have.status(201);
                res.should.be.json;
                // console.log(res.body)
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Ted');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Ted');
                done();
            })
    });
    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/items/3')
            .end(function(err, res) {
                res.should.have.status(200);
                storage.items.should.have.length(3);
                // console.log('Items:', storage.items.length)
                done();
            })
    });
    it('POST to an ID that exists', function(done) {
        chai.request(app)
        .post('/items/2')
            .send({
            	//console.log(Noting will happen because I am posting to an ID that already exists. To edit I would have to put)
            })
            .end(function(err, res) {
                done();
            })
    });
    it('POST without body data', function(done){
    	chai.request(app)
    	.post('/items')
    	.send({
    	//console.log(Nothing will happen because nothing is being sent in the body, ID will be created but name will be undefined)
    	})
    	.end(function(err, res){
    		done();
    	})
    });
    // it('POST with something other than valid JSON', function(done){
    // 	chai.request(app)
    // 	.post('/items')
    // 	.send(
    // 		'just a string not an object'
    // 		//console.log(Not sending an object, sending a string)
    // 	)
    // 	console.log(storage.items)
    // 	.end(function(err, res){
    // 		expect(send).to.be.string;
    // 		done();
    // 	})
    // });
    it('PUT without an ID in the endpoint', function(done) {
        chai.request(app)
        .put('/items')
            .send({
                'name': 'Bob',
            })
            .end(function(err, res) {
                //console.log(storage.items)
                done();
            })
    });
    it('PUT with different ID in the endpoint than the body', function(done) {
        chai.request(app)
        .put('/items/2')
            .send({
            	'name': 'sam',
                'id': '3',
            })
            .end(function(err, res) {
                console.log(storage.items)
                done();
            })
             });
    it('PUT to an ID that doesnt exist', function(done) {
        chai.request(app)
        .put('/items')
            .send({
                'name': 'John',
            })
            .end(function(err, res) {
               console.log(storage.items)
                done();
            })
             });
    it('PUT without body data', function(done) {
        chai.request(app)
        .put('/items')
            .send({
            })
            .end(function(err, res) {
                // console.log(storage.items)
                done();
            })
             });
    // it('PUT with something other than valid JSON', function(done) {
    //     chai.request(app)
    //     .put('/items/15')
    //         .send({
    //             'name': 'John',
    //         })
    //         .end(function(err, res) {
    //             // console.log(storage.items)
    //             done();
    //         })
    //          });
    it('DELETE an ID that doesnt exist', function(done) {
        chai.request(app)
        .delete('/items/5')
            .end(function(err, res) {
                // console.log(storage.items)
                done();
            })
             });
    it('DELETE without an ID in the endpoint', function(done) {
        chai.request(app)
        .delete('/items')
            .send({
            })
            .end(function(err, res) {
                // console.log(storage.items)
                done();
            })
             });
    });