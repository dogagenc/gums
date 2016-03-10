//Global
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
//Server
var connect = require('gulp-connect');
//Template Engine
var mustache = require('gulp-mustache');
//Stylesheet
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
//javascript
var uglify = require('gulp-uglify');

gulp.task('server', function(){
  return connect.server({
    root: 'dist',
    port: 3000
  });
});

gulp.task('sass', function(){
  return gulp.src('./scss/style.scss')
    .pipe( sourcemaps.init() )
      .pipe( sass().on('error', sass.logError) )
      .pipe( autoprefixer() )
      .pipe( gulp.dest('./dist/css') )
      .pipe( cleancss() )
      .pipe( rename({ suffix: '.min' }) )
    .pipe( sourcemaps.write('./') )
    .pipe( gulp.dest('./dist/css') );
});

gulp.task('js', function(){
  return gulp.src('./js/*.js')
    .pipe( sourcemaps.init() )
      .pipe( gulp.dest('./dist/js') )
      .pipe( uglify() )
      .pipe( rename({ suffix: '.min' }) )
    .pipe( sourcemaps.write('./') )
    .pipe( gulp.dest('./dist/js') );
});

gulp.task('mustache', function(){
  return gulp.src('./src/*.html')
    .pipe( mustache() )
    .pipe( gulp.dest('./dist') );
});

gulp.task('watch', function(){
  gulp.watch('./scss/**/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch(['./src/**/*.html', './src/**/*.mustache'], ['mustache']);
});

gulp.task('build', ['sass', 'js', 'mustache']);
gulp.task('default', ['server', 'sass', 'js', 'mustache', 'watch']);
