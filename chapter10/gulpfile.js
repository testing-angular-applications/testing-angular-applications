const gulp = require('gulp');

const tsGlobs = ['./**/e2e/**/*.ts'];

gulp.task('format:enforce', () => {
  const format = require('gulp-clang-format');
  const clangFormat = require('clang-format');
  return gulp.src(tsGlobs).pipe(
    format.checkFormat('file', clangFormat, {verbose: true, fail: true}));
});

gulp.task('format', () => {
  const format = require('gulp-clang-format');
  const clangFormat = require('clang-format');
  return gulp.src(tsGlobs, { base: '.' }).pipe(
    format.format('file', clangFormat)).pipe(gulp.dest('.'));
});