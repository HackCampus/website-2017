const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const decache = require('decache')
const ecstatic = require('ecstatic')
const file = require('gulp-file')
const gulp = require('gulp')
const http = require('http')
const livereload = require('livereload')
const mkdirp = require('mkdirp')
const notifier = require('node-notifier')
const path = require('path')
const postcss = require('gulp-postcss')
const precss = require('precss')
const rimraf = require('rimraf')

function rerequire (module) {
  decache(module)
  return require(module)
}

const local = (...paths) => path.join(__dirname, ...paths)

gulp.task('html', done => {
  try {
    const template = rerequire('./template')
    return file('index.html', template(), {src: true})
      .pipe(gulp.dest(local('build')))
  } catch (e) {
    notifier.notify({
      title: 'hackcampus',
      message: e.message,
    })
    console.log(e)
    done()
  }
})

gulp.task('styles', () =>
  gulp.src(local('styles', '*.css'))
    .pipe(postcss([
      precss(),
      autoprefixer(),
      cssnano(),
    ]))
    .pipe(gulp.dest(local('build', 'styles')))
)

gulp.task('clean', (done) => {
  rimraf.sync(local('build'))
  mkdirp.sync(local('build'))
  done()
})

gulp.task('watch', () => {
  const watchers = [
    gulp.watch(local('styles', '*.css'), gulp.parallel('styles')),
    gulp.watch(local('*.js'), gulp.parallel('html')),
  ]
  watchers.forEach(watcher => {
    watcher.on('change', event => { console.log(event) })
  })
})

gulp.task('serve', () => {
  http.createServer(
    ecstatic({ root: local('build') })
  ).listen(8080);
})

gulp.task('livereload', () => {
  const server = livereload.createServer()
  server.watch(local('build'))
})

gulp.task('build', gulp.parallel('html', 'styles'))

gulp.task('local-dev', gulp.parallel('watch', 'serve', 'livereload'))

gulp.task('release', gulp.series('clean', 'build'))
gulp.task('develop', gulp.series('clean', 'build', 'local-dev'))
