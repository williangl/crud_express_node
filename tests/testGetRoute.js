const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const app = require('../app');
const Address = require('../model/models');

const should = chai.should();

const addresses = [
  {
    name: 'Teste 123',
    email: 'teste123@teste.com',
    phone: '99999999',
    place: 'xpto teste 123',
  },
  {
    name: 'Teste 321',
    email: 'teste321@teste.com',
    phone: '0000000',
    place: 'xpto teste 321',
  },
];

chai.use(chaiHTTP);

describe('/GET', () => {
  beforeEach((done) => {
    Address.insertMany(addresses, (err) => {
      done();
    });
  });

  afterEach((done) => {
    Address.deleteMany({}, (err) => {
      done();
    });
  });

  it('Should return all data when send a get request', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        done();
      });
  });
  it('Should return the data by ID when get the ID information', (done) => {
    chai.request(app)
      .get('/Teste 123')
      .end((err, res) => {
        res.body.forEach((address) => {
          address.should.have.property('name');
          address.should.have.property('email');
          address.should.have.property('phone');
          address.should.have.property('place');
        });
        done();
      });
  });
});
