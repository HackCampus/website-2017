const autoprefixer = require('autoprefixer')
const babelify = require('babelify')
const browserify = require('browserify')
const cssnano = require('cssnano')
const decache = require('decache')
const ecstatic = require('ecstatic')
const exorcist = require('exorcist')
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
const uglifyify = require('uglifyify')
const source = require('vinyl-source-stream')

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

gulp.task('js', () => {
  return browserify({
    entries: [local('scripts', 'index.js')],
    // fullPaths: true, // for disc
    debug: true,
  })
  .transform(babelify, {presets: ['es2015']})
  // .transform(uglifyify, {global: true})
  .bundle()
  .on('error', e => {
    notifier.notify({
      title: 'hackcampus',
      message: e.message,
    })
    throw e
  })
  .pipe(exorcist(local('build', 'hc.js.map')))
  .pipe(source('hc.js'))
  .pipe(gulp.dest(local('build')))
})

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

const serverPort = 8080
gulp.task('serve', () => {
  http.createServer(
    ecstatic({ root: local('build') })
  ).listen(serverPort, err => {
    console.log(serverPort)
  })
})

gulp.task('livereload', () => {
  const server = livereload.createServer()
  server.watch(local('build'))
})

gulp.task('build', gulp.parallel('html', 'styles', 'js'))

gulp.task('local-dev', gulp.parallel('watch', 'serve', 'livereload'))

gulp.task('release', gulp.series('clean', 'build'))
gulp.task('develop', gulp.series('clean', 'build', 'local-dev'))
