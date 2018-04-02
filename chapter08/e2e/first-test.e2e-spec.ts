import {browser} from 'protractor';

// Listing 8.4
describe('our first Protractor test', () => {
  it('should load a page and verify the url', () => {
    browser.get('/#/');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/');
  });
});
