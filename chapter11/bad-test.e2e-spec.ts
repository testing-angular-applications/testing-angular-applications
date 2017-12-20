import {protractor, by, element} from 'protractor';

describe('a bad test', () => {
  it('should fail', () => {
    browser.get('/');
    element(by.id('non-exist-id')).click();
  });
});