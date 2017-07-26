var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var cssnano = require('cssnano');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var atImport = require('postcss-import');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var path = require('path');

/**
 * The output directory for all the built files.
 */
const DEST = './public/dist';

/**
 * The name of the Github repo.
 */
const REPO = 'insights-assignment';

/**
 * The base public path of the site.
 */
const PUBLIC_PATH = path.join('/', (isProd() ? REPO : '.'), '/');

function isProd() {
  return process.env.NODE_ENV == 'production';
}

gulp.task('js', function() {
  return gulp.src(['assets/javascript/**/*.js'])
    // .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(DEST))
    .pipe(notify({message : 'JS files successfully concated and reduced'}));
});

gulp.task('jshint', function() {
  return gulp.src('public/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('css', function () {
    return gulp.src('./assets/css/main.css')
    .pipe(concat('bundle.css'))
    .pipe(postcss([
      atImport(),
      cssnext({}),
      cssnano()
    ]))
    .pipe(gulp.dest(DEST))
    .pipe(notify({message : 'Scss Successfully compiled and reduced'}));
});

/*
gulp.task('css', function(){
  return sass('assets/css/main.css', { 
      style: 'expanded', 
      includePaths: ['node_modules'] }
    )
    .pipe(plumber({errorHandler: streamError}))
    .pipe(gulp.dest('public/dist/styles/'))
    .pipe(rename({suffix : '.min'}))
    .pipe(cssnano())
    .pipe(concat('style.css'))
    .pipe(notify({message : 'Scss Successfully compiled and reduced'}));
});
*/

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('src/assets/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/**/*.js', ['scripts']);
});