var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    cover = require('gulp-coverage'),
    jscs = require('gulp-jscs');

gulp.task('default', ['jscs', 'lint', 'test'], function () {
});

gulp.task('lint', function () {
    return gulp.src(['./lib/*.js', './test/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default', {verbose: true}));
});

gulp.task('test', ['jscs', 'lint'], function () {
    return gulp.src('./test', {read: false})
        .pipe(cover.instrument({
            pattern: ['*lib/*.js'],
            debugDirectory: 'debug'
        }))
        .pipe(mocha({reporter: 'nyan'}))
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});

gulp.task('jscs', function () {
    return gulp.src(['./lib/*.js', './test/*.js'])
        .pipe(jscs());
});
