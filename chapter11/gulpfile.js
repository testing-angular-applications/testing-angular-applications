const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('copy-website', () => {
  return gulp.src([
    '!../website/node_modules',
    '../website/**/*',
    '../website/.**/*', 
    '../website/**/.*', 
    '../website/.**/.*'
    ])
    .pipe(gulp.dest('ci/'));
});

gulp.task('copy-contact-edit', () => {
  return gulp.src(['../chapter03/contacts-edit.component.spec.ts'])
    .pipe(gulp.dest('ci/src/app/contacts/contact-edit/'));
});

gulp.task('copy-contact', () => {
  return gulp.src(['../chapter03/contacts.component.spec.ts'])
    .pipe(gulp.dest('ci/src/app/contacts/'));
});

gulp.task('copy-e2e-ch08', () => {
  return gulp.src(['../chapter08/e2e/**/*'])
    .pipe(gulp.dest('ci/e2e/chapter08'));
});

gulp.task('copy-e2e-ch09', () => {
  return gulp.src(['../chapter09/e2e/**/*'])
    .pipe(gulp.dest('ci/e2e/chapter09'));
});

gulp.task('copy-e2e-ch10', () => {
  return gulp.src(['../chapter10/test_environment/e2e/**/*'])
    .pipe(gulp.dest('ci/e2e/chapter10'));
});

gulp.task('copy-conf', () => {
  return gulp.src([
    'karma.conf.js',
    'protractor.conf.js'])
    .pipe(gulp.dest('ci/'));
});

gulp.task('copy-bad-e2e', () => {
  return gulp.src(['bad-test.e2e-spec.ts'])
    .pipe(gulp.dest('ci/e2e'));
});

gulp.task('copy-bad-unit', () => {
  return gulp.src(['bad-test.spec.ts'])
    .pipe(gulp.dest('ci/src/app'));
});

gulp.task('copy', (done) => {
  return runSequence('copy-website', 
    ['copy-contact-edit', 'copy-contact', 'copy-bad-e2e', 'copy-bad-unit',
    'copy-e2e-ch08', 'copy-e2e-ch09', 'copy-e2e-ch10', 'copy-conf'], done);
});
