import { ContactListPageObject, AddContactPageObject } from './po';

describe('adding a new contact with only a name', () => {
  let contactList: ContactListPageObject;
  let addContact: AddContactPageObject;

  beforeAll(() => {
    contactList = new ContactListPageObject();
    addContact = new AddContactPageObject();
    contactList.navigateTo();
  });

  it('should find the add contact button', () => {
    contactList.clickPlusButton();
    addContact.verifyUrl();
  });

  it('should write a name', () => {
    addContact.setContactInfo('Ada');
    expect(addContact.getName()).toEqual('Ada');
  });

  it('should click the create button', () => {
    addContact.clickCreateButton();
    contactList.verifyUrl();
  });
});