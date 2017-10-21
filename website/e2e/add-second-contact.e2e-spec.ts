import { ContactListPageObject, AddContactPageObject } from './po';

describe('adding a new contact with name, email, and phone number', () => {
  let contactListPageObject: ContactListPageObject;
  let addContactPageObject: AddContactPageObject;

  beforeAll(() => {
    contactListPageObject = new ContactListPageObject();
    addContactPageObject = new AddContactPageObject();
    contactListPageObject.navigateTo();
    contactListPageObject.clickPlusButton();
  });
  
  it('should should fill out the fields', () => {
    addContactPageObject.setContactInfo('Grace\'s Directive', 'grace@example.com', '1234567890');
    expect(addContactPageObject.getName()).toEqual('Grace\'s Directive');
    expect(addContactPageObject.getEmail()).toEqual('grace@example.com');
    expect(addContactPageObject.getPhone()).toEqual('1234567890');
  });
});