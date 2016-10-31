const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const gulp = require('gulp')
const mkdirp = require('mkdirp')
const path = require('path')
const postcss = require('gulp-postcss')
const precss = require('precss')
const rimraf = require('rimraf')

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
    gulp.watch('./styles/*.css', gulp.parallel('styles'))
  ]
  watchers.forEach(watcher => {
    watcher.on('change', event => {
      console.log(event)
    })
  })
})

gulp.task('develop', gulp.series('clean', 'watch'))
