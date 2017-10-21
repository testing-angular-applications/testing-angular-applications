import { ContactListPageObject, Contact } from './po';
import { by } from 'protractor';

describe('the contact list', () => {
  let contactList: ContactListPageObject;

  beforeAll(() => {
    contactList = new ContactListPageObject();
    contactList.navigateTo();
  });

  it('with filter: should find existing contact "Craig Service"', () => {
    let craigService = contactList.findContact('Craig Service');
    // Nothing happens here until you use it. Although we called getText in the filter function,
    // it is not executed until we use it. When you use it, the promises enter the control flow
    // and are resolved. This is similar to calling element(), nothing happens until you do
    // something like getText().
    expect(craigService.count()).toBeGreaterThan(0);
    expect(craigService.all(by.tagName('td')).get(2).getText())
      .toEqual('craig.services@example.com');
  });

  let expectedContactList: Contact[] = [{
    name: 'Adrian Directive',
    email: 'adrian.directive@example.com',
    tel: '+1 (703) 555-0123'
  }, {
    name: 'Rusty Component',
    email: 'rusty.component@example.com',
    tel: '+1 (441) 555-0122'
  }, {
    name: 'Jeff Pipe',
    email: 'jeff.pipe@example.com',
    tel: '+1 (714) 555-0111'
  }, {
    name: 'Craig Service',
    email: 'craig.services@example.com',
    tel: '+1 (514) 555-0132'
  }];
  
  it('with map: should create a map object', () => {
    let actualContactList = contactList.getContacts();
    
    // Check the results
    expect(actualContactList).toBeDefined();
    actualContactList.then(contacts => {
      // Spot check the results
      expect(contacts.length).toEqual(4);
      expect(contacts[0]).toBeDefined();
      expect(contacts[1].email).toEqual('rusty.component@example.com');
      expect(contacts[2].tel).toEqual('+1 (714) 555-0111');
      expect(contacts[3].name).toEqual('Craig Service');

      // Check all the contacts match
      expect(actualContactList).toEqual(expectedContactList);
    });
  });

  it('with reduce: get a list of contact names', () => {
    let contactNames = contactList.getContactNames();
    expect(contactNames).toBe('Adrian Directive, Rusty Component, Jeff Pipe, Craig Service');
  });
});
