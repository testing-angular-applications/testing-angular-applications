// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.config = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--no-sandbox']
    }
  },
  directConnect: true,
  baseUrl: 'https://contacts-app-starter.firebaseapp.com',
  
  framework: 'jasmine',
  specs: [
    './e2e/page-objects.e2e-spec.ts'
  ],
  onPrepare: () => {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  useAllAngular2AppRoots: true
};
