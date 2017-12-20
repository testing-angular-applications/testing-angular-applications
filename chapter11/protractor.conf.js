exports.config = {
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--no-sandbox']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200',

  framework: 'jasmine',
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  
  onPrepare: () => {
    let jasmineReporters = require('jasmine-reporters');
    let junitReporter = new jasmineReporters.JUnitXmlReporter({
      savePath: 'output/',
      consolidateAll: false
    });
    jasmine.getEnv().addReporter(junitReporter);
  
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  useAllAngular2AppRoots: true
};
