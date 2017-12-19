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
    './e2e/**/*.e2e-spec.ts'
  ],
  onPrepare: () => {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  useAllAngular2AppRoots: true
};