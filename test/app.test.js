// this is the test file.
const supertest = require('supertest');
const { expect } = require('chai');
// include the response app.
const app = require('../app');

describe('GET / books', () => {
  it('should return an array of books', () => {
      // use supertest to do a query.
      return supertest(app)
      .get('/books')
      .expect(200)
      .expect('Content-Type', /json/)
      // Chai assertions
      .then(res => {
        // check for array.
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const book = res.body[0];
        expect(book).to.include.all.keys(
          'bestsellers_date', 'author', 'description', 'title'
        );
      });
  })

  // check 
  it('should be 400 if sort is incorrect', () => {
    return supertest(app)
      .get('/books')
      // extra param check.
      .query({ sort: 'MISTAKE' })
      // expect res to return 400 and string below will be return by app.js
      .expect(400, 'Sort must be one of title or rank');
  });

  // it('len of the book list is x', () => {
  //   return supertest(app)
  //     .get('/books')
  //     .query({ sort: 'MISTAKE' })
  //     // expect res to return 400 and string below
  //     .expect(400, 'Sort must be one of title or rank');
  // });

});
