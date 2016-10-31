const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const file = require('gulp-file')
const gulp = require('gulp')
const mkdirp = require('mkdirp')
const path = require('path')
const postcss = require('gulp-postcss')
const precss = require('precss')
const rimraf = require('rimraf')

const template = require('./template')

gulp.task('html', () =>
  file('index.html', template(), {src: true})
    .pipe(gulp.dest('./build'))
)

gulp.task('styles', () =>
  gulp.src('./styles/*.css')
    .pipe(postcss([
      precss(),
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(gulp.dest('./build/styles'))
)

gulp.task('clean', (done) => {
  rimraf.sync('./build')
  mkdirp.sync('./build')
  done()
})

gulp.task('watch', () => {
  const watchers = [
    gulp.watch('./styles/*.css', gulp.parallel('styles')),
    gulp.watch('./*.js', gulp.parallel('html')),
  ]
  watchers.forEach(watcher => {
    watcher.on('change', event => { console.log(event) })
  })
})

gulp.task('build', gulp.parallel('html', 'styles'))

gulp.task('release', gulp.series('clean', 'build'))
gulp.task('develop', gulp.series('clean', 'build', 'watch'))
