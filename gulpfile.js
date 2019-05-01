'use strict'

const gulp = require('gulp');
const ts = require('gulp-typescript');
const jest = require('gulp-jest').default;
const plumber = require('gulp-plumber');

let tsProject = ts.createProject('tsconfig.json');

function compile(done) {
  return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('dist'));
}
exports.compile = compile;

function test(done) {
  return gulp.src('dist/spec/**/*.spec.js')
    .pipe(plumber())
    .pipe(jest());
}
exports.test = test;

function coverage(done) {
  return gulp.src('dist/spec/**/*.spec.js')
    .pipe(jest({ collectCoverage: true }));
}
exports.coverage = coverage;

function watch() {
  gulp.watch(
    '**/*.ts',
    gulp.series(compile, test)
  );
}
exports.watch = watch;
