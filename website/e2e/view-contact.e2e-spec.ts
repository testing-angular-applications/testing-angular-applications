import { ContactListPageObject, AddContactPageObject, ViewContactPageObject  } from './po';

let contactListPageObject: ContactListPageObject;
let addContactPageObject: AddContactPageObject
let viewContactPageObject: ViewContactPageObject;

describe('viewing a contact', () => {  
  let contactNumber = 1;
  let name = 'Adrian Directive';
  let email = 'adrian.directive@example.com';
  let phoneNumber = '+1 (703) 555-0123';

  describe('browse to existing contact from contact list', () => {
    beforeAll(() => {
      contactListPageObject = new ContactListPageObject();
      viewContactPageObject = new ViewContactPageObject();
      contactListPageObject.navigateTo();
    });

    it('should click on the first contact and navigate to the correct url', () => {
      contactListPageObject.clickContactNumber(contactNumber);
      viewContactPageObject.verifyUrl(contactNumber);
    });

    it('should find the contact name', () => {
      expect(viewContactPageObject.getName()).toBe(name);
    });

    it('should find the email', () => {
      expect(viewContactPageObject.getEmail()).toEqual(email);
    });

    it('should find the phone number', () => {
      expect(viewContactPageObject.getPhoneNumber()).toEqual(phoneNumber);
    });
  });
  
  describe('navigate directly to existing contact', () => {
    beforeAll(() => {
      viewContactPageObject = new ViewContactPageObject();
      viewContactPageObject.navigateTo(contactNumber);
    });

    it('should navigate to the correct url', () => {
      viewContactPageObject.verifyUrl(contactNumber);
    });

    it('should find the contact name', () => {
      expect(viewContactPageObject.getName()).toBe(name);
    });

    it('should find the email', () => {
      expect(viewContactPageObject.getEmail()).toEqual(email);
    });

    it('should find the phone number', () => {
      expect(viewContactPageObject.getPhoneNumber()).toEqual(phoneNumber);
    });
  });
});

describe('by first creating a contact', () => {
  beforeAll(() => {
    contactListPageObject = new ContactListPageObject();
    addContactPageObject = new AddContactPageObject();
    viewContactPageObject = new ViewContactPageObject();
  });

  describe('with only an email address', () => {
    beforeAll(() => {
      contactListPageObject.navigateTo();
      contactListPageObject.clickPlusButton();
      addContactPageObject.setContactInfo('Foo Bar', 'foo@bar.com');
      addContactPageObject.clickCreateButton();
    });

    it('should navigate to the correct url', () => {
      contactListPageObject.getContacts().then(contacts => {
        contactListPageObject.findContact('Foo Bar').click();
        expect(viewContactPageObject.verifyUrl(contacts.length));  
      });
    });
  
    it('should find the contact name', () => {
      expect(viewContactPageObject.getName()).toEqual('Foo Bar');
    });
  
    it('should find the email', () => {
      expect(viewContactPageObject.getEmail()).toEqual('foo@bar.com');
    });
  
    it('should not find a phone number', () => {
      expect(viewContactPageObject.getPhoneNumber()).toEqual('');
    });
  });

  describe('with only a phone number', () => {
    beforeAll(() => {
      contactListPageObject.navigateTo();
      contactListPageObject.clickPlusButton();
      addContactPageObject.setContactInfo('Fizz Buzz', null, '1234567890');
      addContactPageObject.clickCreateButton();
    });

    it('should navigate to the correct url', () => {
      contactListPageObject.getContacts().then(contacts => {
        contactListPageObject.findContact('Fizz Buzz').click();
        expect(viewContactPageObject.verifyUrl(contacts.length));  
      });
    });
  
    it('should find the contact name', () => {
      expect(viewContactPageObject.getName()).toEqual('Fizz Buzz');
    });
  
    it('should not find the email', () => {
      expect(viewContactPageObject.getEmail()).toEqual('');
    });
  
    it('should find a phone number', () => {
      expect(viewContactPageObject.getPhoneNumber()).toEqual('+1 (123) 456-7890');
    });
  });
});