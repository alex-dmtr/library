var mocha = require('mocha')
var request = require('supertest')
var app = require('../app')
var assert = require('assert')

context('API', () => {
  context('authors', () => {
    it('should return [] of authors', (done) => {
      request(app)
        .get('/api/authors')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)


          done()
        })
    })

  })
  
})