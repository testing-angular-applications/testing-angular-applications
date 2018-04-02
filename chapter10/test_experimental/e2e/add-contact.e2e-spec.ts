import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('contact list', () => {
  beforeAll(() => {
    browser.get('/#/');
  });

  it('should be able to add a contact', () => {
    // Click the add button
    element(by.id('add-contact')).click();

    // Add the contact
    element(by.id('contact-name')).sendKeys('Ada Contact');
    element(by.css('.create-button')).click();

    // Expect the new contact to show in the list
    expect(element(by.css('app-contact-list')).getText()).toContain('Ada Contact');
  });
});
