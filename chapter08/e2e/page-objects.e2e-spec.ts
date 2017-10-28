import {browser, by} from 'protractor';

import {COL, Contact, ContactListPageObject, NewContactPageObject} from './po';

describe('contact list', () => {
  let contactList: ContactListPageObject;
  let newContact: NewContactPageObject;

  beforeAll(() => {
    // We could also add the browser object here. For example: new
    // ContactListPO(browser). This could become important if we fork the
    // browser since the browser object refers to the current selenium session.
    contactList = new ContactListPageObject();
  });

  describe('add a new contact', () => {
    beforeAll(() => {
      contactList.navigateTo();
    });

    it('should click the + button', () => {
      newContact = contactList.clickPlusButton();
      expect(newContact.getCurrentUrl()).toBe(browser.baseUrl + '/add');
    });

    it('should fill out form for a new contact', () => {
      newContact.setContactInfo('Mr. Newton', 'mr.newton@example.com', null);
      expect(newContact.getName()).toBe('Mr. Newton');
      expect(newContact.getEmail()).toBe('mr.newton@example.com');
      expect(newContact.getPhone()).toBe('');
    });

    it('should click the create button', () => {
      contactList = newContact.clickCreateButton();
      expect(contactList.getCurrentUrl()).toBe(browser.baseUrl + '/');
    });
  });

  describe('read contact list', () => {
    it('should find the new contact', () => {
      let tableRow = contactList.findContact('Mr. Newton').get(0);
      let tableData = tableRow.all(by.tagName('td'));
      expect(tableData.get(COL.name).getText()).toBe('Mr. Newton');
      expect(tableData.get(COL.email).getText()).toBe('mr.newton@example.com');
      expect(tableData.get(COL.phoneNumber).getText()).toBe('');
    });

    it('should find the contacts and verify each value', () => {
      let contacts = contactList.getContacts();
      contacts.then((contacts: Contact[]) => {
        expect(contacts.length).toBe(5);
        expect(contacts[0]).toBeDefined();
        expect(contacts[1].email).toBe('rusty.component@example.com');
        expect(contacts[2].tel).toBe('+1 (714) 555-0111');
        expect(contacts[3].name).toBe('Craig Service');
        expect(contacts[4].name).toBe('Mr. Newton');
      });
    });

    it('should get the contact names so we can print them to console', () => {
      let contactNames = contactList.getContactNames();
      let expectedNames =
          'Adrian Directive, Rusty Component, Jeff Pipe, Craig Service, Mr. Newton';
      expect(contactNames).toBe(expectedNames);
      contactNames.then(text => {
        console.log(text);
      });
    });
  });
});