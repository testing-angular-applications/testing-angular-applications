import { ContactsComponent } from './contacts.component';
import { Contact } from './shared/models';

describe('ContactsComponent Tests', () => {
  let contactsComponent: ContactsComponent = null;

  beforeEach(() => {
    contactsComponent = new ContactsComponent();
  });

  it('should set instance correctly', () => {
    expect(contactsComponent).toBeTruthy();
  });
});
