import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('interact with elements', () => {

  describe('for a new valid user', () => {
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

  describe('for another new valid user', () => {
    beforeAll(() => {
      browser.get('/');
      element(by.id('add-contact')).click();
      element(by.id('contact-name')).sendKeys('Grace');
    });

    it('should send an email address', () => {
      let email = element(by.id('contact-email'));
      email.sendKeys('grace@hopper.com');
      expect(email.getAttribute('value')).toEqual('grace@hopper.com');
    });

    it('should send a phone number', () => {
      let tel = element(by.css('input[type="tel"]'));
      tel.sendKeys('1234567890');
      expect(tel.getAttribute('value')).toEqual('1234567890');
    });
  });

  describe('for an invalid email', () => {
    beforeEach(() => {
      browser.get('/add');
      element(by.id('contact-name')).sendKeys('Bad Email');
    });

    it('should send an invalid email', () => {
      let email = element(by.id('contact-email'));
      email.sendKeys('baduser.com');
      element(by.buttonText('Create')).click();

      let invalidEmailModal = element(by.tagName('app-invalid-email-modal'));
      expect(invalidEmailModal.isPresent()).toBe(true);

      let modalButton = invalidEmailModal.element(by.tagName('button'));
      modalButton.click();

      browser.wait(EC.not(EC.presenceOf(invalidEmailModal)), 5000);
      expect(invalidEmailModal.isPresent()).toBe(false);
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
    });

    it('should also send an invalid email', () => {
      let email = element(by.id('contact-email'));
      email.sendKeys('@baduser.com');
      let invalidEmailModal = element(by.tagName('app-invalid-email-modal'));
      expect(invalidEmailModal.isPresent()).toBe(false);
    });
  });

 describe('for an invalid phone number', () => {
    beforeEach(() => {
      browser.get('/add');
      element(by.id('contact-name')).sendKeys('Bad Tel');
    });

    it('should send an invalid tel', () => {
      let tel = element(by.css('input[type="tel"]'));
      tel.sendKeys('123-456-7890');
      element(by.buttonText('Create')).click();
      let invalidTelModal = element(by.tagName('app-invalid-phone-number-modal'));
      expect(invalidTelModal.isDisplayed()).toBe(true);
      let modalButton = invalidTelModal.element(by.tagName('button'));
      modalButton.click();

      browser.wait(EC.not(EC.presenceOf(invalidTelModal)), 5000);
      expect(invalidTelModal.isPresent()).toBe(false);
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
    });

    it('should also send an invalid tel', () => {
      let tel = element(by.css('input[type="tel"]'));
      tel.sendKeys('12345678901');
      element(by.buttonText('Create')).click();
      let invalidTelModal = element(by.tagName('app-invalid-phone-number-modal'));
      expect(invalidTelModal.isDisplayed()).toBe(true);
      let modalButton = invalidTelModal.element(by.tagName('button'));
      modalButton.click();
      
      browser.wait(EC.not(EC.presenceOf(invalidTelModal)), 5000);
      expect(invalidTelModal.isPresent()).toBe(false);
      expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/add');
    });
  });
});