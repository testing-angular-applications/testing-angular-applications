import {
  AddContactPageObject,
  ContactListPageObject,
  ViewContactPageObject
} from './po';

describe('routing', () => {
  it('should load the contact list page', () => {
    let contactList = new ContactListPageObject();
    contactList.navigateTo();
    contactList.verifyUrl();
  });

  it('should load the add contact page', () => {
    let addContact = new AddContactPageObject();
    addContact.navigateTo();
    addContact.verifyUrl();
  });

  it('should load a contact detail page', () => {
    let viewContact = new ViewContactPageObject();
    viewContact.navigateTo(1);
    viewContact.verifyUrl(1);
  });
});