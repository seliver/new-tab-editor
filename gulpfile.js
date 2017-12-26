var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssuglify = require('gulp-clean-css');
var paths = {
  vendors_js: [
    'node_modules/mustache/mustache.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/codemirror/lib/codemirror.js',
    'node_modules/bootstrap/dist/js/bootstrap.js'
  ],
  vendors_css: [
      'node_modules/codemirror/lib/codemirror.css',
      'node_modules/bootstrap/dist/css/bootstrap.css'
  ],
  script: 'scripts.js'
};

gulp.task('js-dev', function() {
  return gulp.src(paths.script)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('js'));
});
gulp.task('js', function() {
  return gulp.src(paths.script)
      .pipe(uglify())
      .pipe(concat('all.js'))
    .pipe(gulp.dest('js'));
});
gulp.task('vendor-js', function(){
  return gulp.src(paths.vendors_js)
//      .pipe(uglify())
      .pipe(concat('vendors.js'))
    .pipe(gulp.dest('js'));
});
gulp.task('vendor-css', function(){
  return gulp.src(paths.vendors_css)
      .pipe(cssuglify())
      .pipe(concat('vendors.css'))
    .pipe(gulp.dest('css'));
});
// Rerun the task when a file changes
gulp.task('watch-dev', function() {
  gulp.watch(paths.script, gulp.series('js-dev'));
});

gulp.task('watch', function() {
  gulp.watch(paths.script, gulp.series('script'));
});

