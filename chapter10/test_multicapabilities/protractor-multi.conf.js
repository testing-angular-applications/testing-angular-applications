exports.config = {
  multiCapabilities: [ {
    browserName: 'chrome'  
  }, {
    browserName: 'safari'
  } ],
  baseUrl: 'https://contacts-app-starter.firebaseapp.com',
  specs: ['e2e/**/*.e2e-spec.ts'],
  onPrepare: () => {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  useAllAngular2AppRoots: true
};
