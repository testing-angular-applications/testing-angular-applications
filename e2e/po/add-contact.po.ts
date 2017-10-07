import { by, ElementFinder, ProtractorBrowser } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';
import { PageObject } from './base.po';

export class AddContactPageObject extends PageObject {
  inputName: ElementFinder;
  inputEmail: ElementFinder;
  inputPhone: ElementFinder;
  createButton: ElementFinder;
  invalidEmailModal: ElementFinder;
  invalidEmailModalButton: ElementFinder;
  invalidPhoneModal: ElementFinder;
  invalidPhoneModalButton: ElementFinder;

  constructor(browser?: ProtractorBrowser) {
    super(browser);
    this.inputName = this.element(by.id('contact-name'));
    this.inputEmail = this.element(by.id('contact-email'));
    this.inputPhone = this.element(by.css('input[type="tel"]'));
    this.createButton = this.element(by.buttonText('Create'));
    this.invalidEmailModal = this.element(by.tagName('app-invalid-email-modal'));
    this.invalidEmailModalButton = this.invalidEmailModal.element(by.tagName('button'));
    this.invalidPhoneModal = this.element(by.tagName('app-invalid-phone-number-modal'));
    this.invalidPhoneModalButton = this.invalidPhoneModal.element(by.tagName('button'));
  }

  navigateTo() {
    this.browser.get('/add');
  }

  verifyUrl() {
    expect(this.browser.getCurrentUrl()).toEqual(this.browser.baseUrl + '/add');
  }

  /**
   * Set extra fields for email and phone number. We should return a promise and since we are doing
   * multiple actions, we should keep track of them in a promises array and return all promises
   * as a single promise.
   * 
   * @param email 
   * @param phoneNumber 
   */
  setContactInfo(name: string, email?: string, phoneNumber?: string) {
    this.inputName.sendKeys(name);
    if (email) {
      this.inputEmail.sendKeys(email);
    }
    if (phoneNumber) {
      this.inputPhone.sendKeys(phoneNumber);
    }
  }

  clickCreateButton() {
    return this.createButton.click();
  }

  getName() {
    return this.inputName.getAttribute('value');
  }

  getEmail() {
    return this.inputEmail.getAttribute('value');
  }

  getPhone() {
    return this.inputPhone.getAttribute('value');
  }

  clickInvalidEmailModalButton() {
    return this.invalidEmailModalButton.click();
  }
  clickInvalidPhoneModalButton() {
    return this.invalidPhoneModalButton.click();
  }
}