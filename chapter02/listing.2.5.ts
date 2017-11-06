import ContactClass from './contact';

describe('ContactClass tests', () => {
  let contact: ContactClass = null;

  beforeEach(() => {
    contact = new ContactClass();
  });

  it('should have a valid constructor', () => {
    expect(contact).not.toBeNull();
  });

  it('should set name properly through constructor', () => {
    contact = new ContactClass('Liz');
    expect(contact.name).toEqual('Liz');
  });

  it('should get and set id properly', () => {
    contact.id = 1;
    expect(contact.id).toEqual(1);
  });

  it('should get and set name properly', () => {
    contact.name = 'Liz';
    expect(contact.name).toEqual('Liz');
  });

  afterEach(() => {
    contact = null;
  });
});
