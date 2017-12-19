const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('copy-website', () => {
  return gulp.src(['../website/**/*', '!../website/node_modules/'])
    .pipe(gulp.dest('ci/'));
});

gulp.task('copy-contact-edit', () => {
  return gulp.src(['../chapter03/contacts-edit.component.spec.ts'])
    .pipe(gulp.dest('ci/src/app/contacts/contact-edit/'))
});

gulp.task('copy-contact', () => {
  return gulp.src(['../chapter03/contacts.component.spec.ts'])
    .pipe(gulp.dest('ci/src/app/contacts/'))
});

gulp.task('copy-karma', () => {
  return gulp.src(['karma.conf.js'])
    .pipe(gulp.dest('ci/'))
});

gulp.task('copy', (done) => {
  return runSequence('copy-website', 
    ['copy-contact-edit', 'copy-contact', 'copy-karma'], done);
});