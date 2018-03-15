import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('adding a new contact with name, email, and phone number', () => {
  beforeAll(() => {
    browser.get('/#/');
    element(by.id('add-contact')).click();
    element(by.id('contact-name')).sendKeys('Grace\'s Directive');
  });

  it('should send an email address', () => {
    let email = element(by.id('contact-email'));
    email.sendKeys('grace@example.com');
    expect(email.getAttribute('value')).toEqual('grace@example.com');
  });

  it('should send a phone number', () => {
    let tel = element(by.css('input[type="tel"]'));
    tel.sendKeys('1234567890');
    expect(tel.getAttribute('value')).toEqual('1234567890');
  });
});