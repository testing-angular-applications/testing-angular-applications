import {browser, by, element} from 'protractor';

describe('listing example', () => {
  it('load /', () => {
    console.log('get /')
    browser.get('/');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');
  });

  it('click "+" button -> /add', () => {
    console.log('click "+" button -> /add')
    element(by.id('add-contact')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
  });

  afterEach(() => {
    // Log performance values from the browser logs after each test.
    browser.manage().logs().get('performance').then((browserLogs) => {
      // Check to see that the web traffic is going to the browser
      expect(browserLogs).not.toBeNull();
      browserLogs.forEach((browserLog) => {
        let message = JSON.parse(browserLog.message).message;
        if (message.method == 'Network.responseReceived') {
          // Instead of just spewing out the message with console.log(message),
          // we could log interesting values.
          if (message.params.response.timing) {
            let status = message.params.response.status;
            let url = message.params.response.url;
            console.log('status=' + status + ' ' + url);
          }
        }
      });
    });
  });
});
