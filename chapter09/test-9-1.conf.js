// Using protractor.conf.js as the base. Editing the specs array.
// Run with `npm run e2e test_8_1.conf.js`
exports.config = require('./protractor.conf.js').config;
exports.config.specs[
  './e2e/**/contact-list.e2e-spec.ts'
];
