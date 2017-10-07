import { AddContactPageObject, ContactListPageObject } from './po';

describe('adding a new contact', () => {
  let addContact: AddContactPageObject;
  let contactList: ContactListPageObject;

  beforeAll(() => {
    addContact = new AddContactPageObject();
  });

  describe('with an invalid email', () => {
    beforeEach(() => {
      addContact.navigateTo();
    });

    it('should not create a new contact with baduser.com', () => {
      addContact.setContactInfo('Bad Email', 'baduser.com');
      addContact.clickCreateButton();

      expect(addContact.invalidEmailModal.isPresent()).toBeTruthy();
      addContact.clickInvalidEmailModalButton();
      let browser = addContact.browser;
      let EC = addContact.expectedConditions;
      browser.wait(EC.not(EC.presenceOf(addContact.invalidEmailModal)), 5000);
      expect(addContact.invalidEmailModal.isPresent()).toBeFalsy();
      addContact.verifyUrl();
    });

    it('should not create a new contact with @baduser.com', () => {
      addContact.setContactInfo('Bad Email', '@baduser.com');
      addContact.clickCreateButton();
      expect(addContact.invalidEmailModal.isPresent()).toBeFalsy();
      // this is probably wrong and we should file a bug
    });
  });

  describe('with an invalid phone number', () => {
    beforeEach(() => {
      addContact.navigateTo();
    });

    it('should not create a new contact with a formatted telephone number', () => {
      addContact.setContactInfo('Bad Tel', null, '123-456-7890');
      addContact.clickCreateButton();

      expect(addContact.invalidPhoneModal.isPresent()).toBeTruthy();
      addContact.clickInvalidPhoneModalButton();
      let browser = addContact.browser;
      let EC = addContact.expectedConditions;
      browser.wait(EC.not(EC.presenceOf(addContact.invalidPhoneModal)), 5000);
      expect(addContact.invalidPhoneModal.isPresent()).toBeFalsy();
      addContact.verifyUrl();
    });

    it('should not create a new contact with too many numbers in the telephone number', () => {
      addContact.setContactInfo('Bad Tel', null, '12345678901');
      addContact.clickCreateButton();

      expect(addContact.invalidPhoneModal.isPresent()).toBeTruthy();
      addContact.clickInvalidPhoneModalButton();
      let browser = addContact.browser;
      let EC = addContact.expectedConditions;
      browser.wait(EC.not(EC.presenceOf(addContact.invalidPhoneModal)), 5000);
      expect(addContact.invalidPhoneModal.isPresent()).toBeFalsy();
      addContact.verifyUrl();
    });
  });
});