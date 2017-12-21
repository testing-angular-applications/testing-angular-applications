exports.config = {
  directConnect: !process.env.IS_JENKINS,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: (process.env.IS_CIRCLE ? ['--headless', '--disable-gpu'] : [])
    }
  },
  baseUrl: 'https://contacts-app-starter.firebaseapp.com',
  specs: ['e2e/**/*.e2e-spec.ts'],
  onPrepare: () => {
    if (process.env.IS_JENKINS) {
      let jasmineReporters = require('jasmine-reporters');
      let junitReporter = new jasmineReporters.JUnitXmlReporter({

        // setup the output path for the junit reports
        savePath: 'output/',

        // conslidate all true:
        //   output/junitresults.xml
        //
        // conslidate all set to false:
        //   output/junitresults-example1.xml
        //   output/junitresults-example2.xml
        consolidateAll: false
      });
      jasmine.getEnv().addReporter(junitReporter);
    }
    require('ts-node').register({
      project: 'e2e'
    });
  },
  useAllAngular2AppRoots: true
};
