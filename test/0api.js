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

          Object.keys(author).forEach(key => assert.equal(author[key], res.body[key]))

          author = res.body
          done()
        })
    })

    it('should return [newAuthor] of authors', (done) => {
      request(app)
        .get('/api/authors')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)

          let foundAuthor = res.body.find(a => a._id === author._id)

          assert.deepEqual(foundAuthor, author)
          done()
        })
    })

    it('should get the author', function() {
      return request(app)
        .get(`/api/authors/${author._id}`)
        .expect(200)
        .expect(author)
    })

    it('should delete the author', function() {
      return request(app)
        .delete(`/api/authors/${author._id}`)
        .expect(200)
    })


  })
  
  context('books', () => {

    let book = {
      name: "The Tragedy of Darth Plagueis the Wise",
      summary: "It's not a story the Jedi would tell you",
      description: "He could save others from death, but not himself."
    }

    it('should insert a book', (done) => {
      request(app)
        .post('/api/books')
        .send(book)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)

          Object.keys(book).forEach(key => assert.equal(book[key], res.body[key]))

          book = res.body
          done()
        })
    })
    it('should return [newBook] of books', (done) => {
      request(app)
        .get('/api/books')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)

          let foundBook = res.body.find(b => b._id === book._id)

          assert.deepEqual(foundBook, book)
         
          done()
        })
    })

    it('should get the book', function() {
      return request(app)
        .get(`/api/books/${book._id}`)
        .expect(200)
        .expect(book)
    })

    it('should delete the book', function() {
      return request(app)
        .delete(`/api/books/${book._id}`)
        .expect(200)
    })
  })
})