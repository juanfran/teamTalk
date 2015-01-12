var gulp = require('gulp');
var less = require('gulp-less');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('connect', function() {
  connect.server({
    'root': 'dist'
  });
});

gulp.task('less', function() {
  gulp.src([
    'src/less/main.less'
  ])
    .pipe(less())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('webrtc', function() {
  gulp.src([
    'src/simplewebrtc.bundle.js'
  ])
    .pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
  gulp.src([
    'src/index.html'
  ])
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', function () {
  gulp.src([
    'dist/lib/lesshat/build/lesshat.less'
  ])
    .pipe(gulp.dest('src/less/'));
})

gulp.task('traceur', function () {
  return gulp.src([
    'src/js/app.js',
    'src/js/config.js',
    'src/js/**/*.js',
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(traceur({
      blockBinding: true
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function () {
  gulp.watch('src/js/**/*.js', ['traceur']);
  gulp.watch('src/less/**/*.less', ['less']);
  gulp.watch('src/index.html', ['html']);
  gulp.watch('src/simplewebrtc.bundle.js', ['webrtc']);
});

gulp.task('default', ['copy', 'less', 'html', 'webrtc', 'traceur', 'watch', 'connect'])
