'use strict'
const gulp = require('gulp')
const eslint = require('gulp-eslint')
const mocha = require('gulp-mocha')

const running = {}
const watching = {}
const files = {
  src: 'lib/**/*.js',
  test: 'test/**/*.js',
  misc: 'gulpfile.js'
}

gulp.task('lint', () => {
  running.lint = [files.src, files.test, files.misc]
  return gulp.src(running.lint)
    .pipe(eslint())
    .pipe(eslint.format())
})

gulp.task('test', () => {
  running.test = [files.test, files.src]
  return gulp.src(running.test[0])
    .pipe(mocha({reporter: 'spec'}))
})

gulp.task('watch', () => {
  Object.keys(running)
    .filter(key => !watching[key])
    .forEach(key => {
      watching[key] = true
      gulp.watch(running[key], [key])
    })
})

gulp.task('default', ['lint', 'test', 'watch'])
