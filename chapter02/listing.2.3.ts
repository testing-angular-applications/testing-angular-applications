import ContactClass from './contact';

describe('Contact class tests', () => {
  let contact: ContactClass = null;

  beforeEach(() => {
    contact = new ContactClass();
  });

  it('should have a valid constuctor', () => {
    expect(contact).not.toBeNull();
  });

  afterEach(() => {
    contact = null;
  });
});
