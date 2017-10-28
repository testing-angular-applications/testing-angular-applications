import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('adding a new contact with only a name', () => {
  beforeAll(() => {
    browser.get('/');
  });

  it('should find the add contact button', () => {
    element(by.id('add-contact')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
  });

  it('should write a name', () => {
    element(by.id('contact-name')).sendKeys('Ada');
    expect(element(by.id('contact-name')).getAttribute('value')).toEqual('Ada');
  });

  it('should click the create button', () => {
    element(by.css('.create-button')).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/');
  });
});