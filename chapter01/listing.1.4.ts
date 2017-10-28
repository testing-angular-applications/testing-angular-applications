import { browser } from 'protractor';

describe('Contacts App title test', () => {
  it('Title should be correct', () => {
    const appUrl = 'https://contacts-app-starter.firebaseapp.com/';
    const expectedTitle = 'Contacts App Starter';
    browser.get(appUrl);
    browser.getTitle().then((actualTitle) => {
      expect(actualTitle).toEqual(expectedTitle);
    });
  });
});
