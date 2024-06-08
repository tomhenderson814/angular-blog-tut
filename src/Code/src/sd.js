const express = require('express');
const app = express();

let totalEnergySupply = 0;
let totalEnergyDemand = 0;

// Producers and consumers are stored as objects with id and energy properties
let producers = {};
let consumers = {};

// Use a counter to generate unique IDs for each producer and consumer
let nextId = 1;



app.post('/signup/producer', (req, res) => {
  // When a producer signs up, create a new ID for them and add it to the producers object
  const id = 'producer' + nextId++;
  producers[id] = 0;

  res.send({ message: 'Producer signed up.', id });
});

app.post('/signup/consumer', (req, res) => {
  // When a consumer signs up, create a new ID for them and add it to the consumers object
  const id = 'consumer' + nextId++;
  consumers[id] = 0;

  res.send({ message: 'Consumer signed up.', id });
});

app.post('/producer', (req, res) => {
  // A producer sends their id and the amount of energy they are supplying
  const { id, energy } = req.body;
  producers[id] = energy;
  totalEnergySupply += energy;

  res.send({ message: 'Energy supply registered.' });
});

app.post('/consumer', (req, res) => {
  // A consumer sends their id and the amount of energy they want
  const { id, energy } = req.body;
  consumers[id] = energy;
  totalEnergyDemand += energy;

  res.send({ message: 'Energy demand registered.' });
});

app.get('/exchangeRate', (req, res) => {
  // The exchange rate is calculated based on supply and demand
  const exchangeRate = totalEnergyDemand / totalEnergySupply;
  res.send({ exchangeRate });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Energy exchange server!');
});



app.listen(3000, () => console.log('Energy exchange server is running.'));








import chai from 'chai';
import chaiHttp from 'chai-http';
const server = require('../app'); // path to your server file
const should = chai.should();

chai.use(chaiHttp);

describe('Energy exchange server', () => {
  it('should register energy supply on /producer POST', (done) => {
    chai.request(server)
      .post('/producer')
      .send({ id: 'producer1', energy: 100 })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('Energy supply registered.');
        done();
      });
  });

  it('should register energy demand on /consumer POST', (done) => {
    chai.request(server)
      .post('/consumer')
      .send({ id: 'consumer1', energy: 50 })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.equal('Energy demand registered.');
        done();
      });
  });

  it('should get exchange rate on /exchangeRate GET', (done) => {
    chai.request(server)
      .get('/exchangeRate')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('exchangeRate');
        done();
      });
  });
});
