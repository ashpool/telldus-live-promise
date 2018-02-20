var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  jscs = require('gulp-jscs');

gulp.task('default', ['jscs', 'lint', 'test'], function () {
});

gulp.task('test', ['jscs'], function () {
  return gulp.src('./test', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
    .pipe(gulp.dest('reports'));
});

gulp.task('jscs', function () {
  return gulp.src(['./lib/*.js', './test/*.js'])
    .pipe(jscs());
});
