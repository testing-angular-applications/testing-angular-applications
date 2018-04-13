import ContactClass from './contact';

describe('ContactClass tests', () => {
  let contact: ContactClass = null;

  beforeEach(() => {
    contact = new ContactClass();
  });

  it('should have a valid constructor', () => {
    expect(contact).not.toBeNull();
  });

  it('should set name correctly through constructor', () => {
    contact = new ContactClass('Liz');
    expect(contact.name).toEqual('Liz');
  });

  it('should get and set id correctly', () => {
    contact.id = 1;
    expect(contact.id).toEqual(1);
  });

  it('should get and set name correctly', () => {
    contact.name = 'Liz';
    expect(contact.name).toEqual('Liz');
  });

  it('should get and set email correctly', () => {
    contact.email = 'liz@sample.com';
    expect(contact.email).toEqual('liz@sample.com');
  });

  it('should get and set number correctly', () => {
    contact.number = '1234567890';
    expect(contact.number).toEqual('1234567890');
  });

  it('should get and set country correctly', () => {
    contact.country = 'United States';
    expect(contact.country).toEqual('United States');
  });

  it('should get and set favorite correctly', () => {
    contact.favorite = true;
    expect(contact.favorite).toEqual(true);
  });

  afterEach(() => {
    contact = null;
  });
});
