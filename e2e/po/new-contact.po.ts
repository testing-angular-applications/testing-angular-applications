import { by, ElementFinder, ProtractorBrowser } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';
import { PageObject } from './base.po';
import { ContactListPageObject } from './contact-list.po';

export class NewContactPageObject extends PageObject {
  inputName: ElementFinder;
  inputEmail: ElementFinder;
  inputPhone: ElementFinder;

  constructor(browser?: ProtractorBrowser) {
    super(browser);
    this.inputName = this.element(by.id('contact-name'));
    this.inputEmail = this.element(by.id('contact-email'));
    this.inputPhone = this.element(by.css('input[type="tel"]'));
  }

  /**
   * Set extra fields for email and phone number. We should return a promise and since we are doing
   * multiple actions, we should keep track of them in a promises array and return all promises
   * as a single promise.
   * 
   * @param email 
   * @param phoneNumber 
   */
  setContactInfo(name: string, email: string, phoneNumber: string) {
    this.inputName.sendKeys(name);
    if (email) {
      this.inputEmail.sendKeys(email);
    }
    if (phoneNumber) {
      this.inputPhone.sendKeys(phoneNumber);
    }
  }

  clickCreateButton() {
    this.element(by.buttonText('Create')).click();
    return new ContactListPageObject();
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
}