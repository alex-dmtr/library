var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha = require('gulp-mocha')
var app = require('./app')

gulp.task('seed', function() {
    var models = require('./models')

    return models
      .truncate()
      .then(() => {
        return models.seed()
      }
      )
})


gulp.task('test', ['seed'], function() {
    return gulp.src('./test/**')
        .pipe(mocha({bail: true}))
        
})

gulp.task('default', ['seed'], function() {
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**'],
        // tasks: ['test'],
        // quiet: true
    })
})