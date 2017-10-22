exports.config = {
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--disable-gpu']
    },
    loggingPrefs: {
      performance: 'ALL',
      browser: 'ALL'
    }
  },
  baseUrl: 'https://contacts-app-starter.firebaseapp.com',
  specs: ['e2e/**/*.e2e-spec.ts'],
  onPrepare: () => {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  useAllAngular2AppRoots: false
};
