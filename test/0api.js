var mocha = require('mocha')
var request = require('supertest')
var app = require('../app')
var assert = require('assert')
var Author = require('../models/author')
var Book = require('../models/book')

context('API', () => {

  before(function() {
    return Author.remove({}).then(function() {
      return Book.remove({})
    })
  })


  context('authors', () => {

    let author = {
      name: 'Darth Plagueis the Wise',
      summary: 'Ever heard his tragedy?'
    }
    it('should create an author', (done) => {
      request(app)
        .post('/api/authors')
        .send(author)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)

          assert.equal(res.body.name, author.name)
          assert.equal(res.body.summary, author.summary)

          author = res.body
          done()
        })
    })

    it('should return [] of authors', (done) => {
      request(app)
        .get('/api/authors')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)

          assert.equal(res.body.length, 1)
          assert.deepEqual(res.body[0], author)
          done()
        })
    })


  })
  
  context('books', () => {
    it('should return [] of books', (done) => {
      request(app)
        .get('/api/books')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)


          done()
        })
    })
  })
})