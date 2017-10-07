import { by, ProtractorBrowser, ElementArrayFinder } from 'protractor';
import { promise as wdpromise } from 'selenium-webdriver';
import { PageObject } from './base.po';

export enum COL {
  name = 1,
  email = 2,
  phoneNumber = 3
}

export interface Contact {
  name?: string;
  email?: string;
  tel?: string;
}

export class ContactListPageObject extends PageObject {
  static nameCol = 1;
  trs: ElementArrayFinder;

  constructor(browser?: ProtractorBrowser) {
    super(browser);

    let tbody = this.element(by.tagName('tbody'));
    this.trs = tbody.all(by.tagName('tr'));
  }

  navigateTo() {
    this.browser.get('/');
  }

  verifyUrl() {
    expect(this.browser.getCurrentUrl()).toEqual(this.browser.baseUrl + '/');
  }

  clickContactNumber(contactNumber: number) {
    return this.trs.count().then(count => {
      const contactIndexNumber = contactNumber - 1;
      if (contactIndexNumber < count) {
        return this.trs.get(contactIndexNumber).click();
      } else {
        throw new Error('contact number out of range');
      }
    });
  }

  clickPlusButton() {
    return this.element(by.id('add-contact')).click();
  }

  /**
   * Returns the ElementArrayFinder object for the table row. This is an array because there could
   * be more than one entry with the same matching name
   * @param name
   */
  findContact(name: string): ElementArrayFinder {
    return this.trs.filter(elem => {
      return elem.all(by.tagName('td')).get(COL.name).getText().then(text => {
        return text === name;
      });
    });
  }

  /**
   * Returns a promise of a contact array.
   */
  getContacts(): wdpromise.Promise<Contact[]> {
    return this.trs.map(elem => {
      let contact: Contact = {};
      let tds = elem.all(by.tagName('td'));
      // We need to get the values of the contact name and email. Since these are in a couple of 
      // different promises, we'll  create a promise array.
      let promises: any[] = [];

      // Getting the text returns a promise of a string then the next function sets the contact's
      // name. This function returns void so the final promise saved is of Promise<void>.
      // We set the promise array to be of type any since we do not care about the promise type.
      promises.push(tds.get(COL.name).getText().then(text => {
        contact.name = text;
      }));
      promises.push(tds.get(COL.email).getText().then(text => {
        contact.email = text;
      }));
      promises.push(tds.get(COL.phoneNumber).getText().then(text => {
        contact.tel = text;
      }));

      // Resolve all the promises and return the contact.
      return Promise.all(promises).then(() => {
        return contact;
      });
    })
  }

  /**
   * Returns a promise of comma delimited names
   */
  getContactNames(): wdpromise.Promise<string> {
    return this.trs.reduce((acc, curr) => {
      let name = curr.all(by.tagName('td')).get(COL.name);
      return name.getText().then(text => {
        return acc === '' ? text : acc + ', ' + text;
      });
    }, '');
  }
}