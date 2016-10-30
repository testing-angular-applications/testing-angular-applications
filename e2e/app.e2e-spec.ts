import { ContactsAppStarterPage } from './app.po';

describe('contacts-app-starter App', function() {
  let page: ContactsAppStarterPage;

  beforeEach(() => {
    page = new ContactsAppStarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
