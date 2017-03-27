module.exports = function({Author, Book}) {

  return function() {
    var seedAuthors = () => {
      return Author
        .create([
          { name: 'author1'},
          { name: 'author2'},
          { name: 'author3'},
        ])
        .then(authors => {
          
          this.authors = authors

        })
    }
    
    var seedBooks = () => { 
      return Book
        .create([
          { name: 'book1', author: this.authors[0]._id},
          { name: 'book2', author: this.authors[1]._id},
          { name: 'book3', author: this.authors[2]._id},
        ])
        .then(books => {
          this.books = books
        })
    }

   return seedAuthors()
    .then(seedBooks)
  }
}