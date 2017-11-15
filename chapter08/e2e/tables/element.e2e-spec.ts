import {browser, by, element, ElementFinder, ElementHelper, ProtractorBy} from 'protractor';
import {By as webdriverBy, WebElement} from 'selenium-webdriver';

fdescribe('element methods', () => {
  beforeEach(() => {
    browser.get('/add');
  });

  // Note: Protractor By is not the same as a Webdriver By
  it('test protractor by and webdriver by', () => {
    let elementFinder = element(by.id('contact-name'));
    expect(elementFinder instanceof ElementFinder).toBe(true);

    browser.sleep(2000);

    let webElementPromise =
        browser.driver.findElement(webdriverBy.id('contact-name'));
    webElementPromise.then(webElement => {
      expect(webElement instanceof WebElement).toBe(true);
    });
  });

  it('getWebElement', () => {
    let webElement = element(by.id('contact-name')).getWebElement();
    expect(webElement instanceof WebElement).toBe(true);

    // find an element inside an element
    let body = element(by.tagName('body'));
    let webElement2 = body.element(by.id('contact-name')).getWebElement();
    expect(webElement2 instanceof WebElement).toBe(true);

    // use a web element API
    webElement2.getLocation().then(point => {
      console.log('x = ' + point.x + ', y = ' + point.y);
    });

    // The other method is the locator value that Protractor uses to look up
    // values.
    console.log(
        'not the same as WebElement.getLocator = ' +
        element(by.id('contact-name')).locator());
  });

  it('isPresent and isElementPresent', () => {
    // element.isPresent
    let byId = by.id('contact-name');
    let contactName = element(byId);
    expect(contactName.isPresent()).toBe(true);

    // body.isElementPresent
    let body = element(by.tagName('body'));
    expect(body.isElementPresent(byId)).toBe(true);

    // using browser.isElementPresent
    expect(browser.isElementPresent(byId)).toBe(true);

    expect(element(by.id('contact-email')).isPresent()).toBe(false);
    element(by.id('contact-email')).isPresent().then(present => {
      let result = present ? 'is present' : 'is not present'
      console.log('the contact email address ' + result + '.');
    });

    // fill out the name field. the Angular structural directive *ngIf will
    // change the dom and the contact email field will appear.
    contactName.sendKeys('foobar');

    expect(element(by.id('contact-email')).isPresent()).toBe(true);
    element(by.id('contact-email')).isPresent().then(present => {
      let result = present ? 'is present' : 'is not present'
      console.log('the contact email address ' + result + '.');
    });
  });

  it('getTagName', () => {
    // Check that the tag name we query for is as expected
    let appNewContact = element(by.tagName('app-new-contact'));
    expect(appNewContact.getTagName()).toBe('app-new-contact');

    // Sometimes we have a web element and want to query for a web element that
    // exists within its children. In this case, we are searching for the
    // material toolbar via the color="primary" attribute. The value of the
    // getTagName should be the material tag name for the toolbar.
    let body = element(by.tagName('body'));
    let matToolbar = body.element(by.css('[color="primary"'));
    expect(matToolbar.getTagName()).toBe('mat-toolbar');
  });

  it('getCssValue', () => {
    let toolbar = element(by.tagName('mat-toolbar'));
    expect(toolbar.getCssValue('background-color'))
        .toBe('rgba(33, 150, 243, 1)');
  });

  it('getAttribute', () => {
    // Check to see the attribute for the class used.
    let matCard = element(by.tagName('mat-card'));
    expect(matCard.getAttribute('class')).toBe('mat-card');

    // Check the keys we entered are as expected. Note that you cannot use
    // getText() on an input field to get the text.
    let name = element(by.id('contact-name'));
    name.sendKeys('foobar');
    expect(name.getAttribute('value')).toBe('foobar');
  });

  it('getText', () => {
    // Navigate back to the contacts list page.
    browser.get('/');

    // This is the content of tbody. This is difficult to test a single row but
    // we can check to see if the contents match with regex.
    element(by.tagName('tbody')).getText().then((text: string) => {
      console.log(text);
      expect(text.match(/craig.services@example.com/).index > 0).toBe(true);
      expect(text.match(/something that does not match/)).toBe(null);
    });
  });

  it('sendKeys', () => {
    let contactName = element(by.id('contact-name'));
    contactName.sendKeys('foobar');
    expect(contactName.getAttribute('value')).toBe('foobar');
  });

  it('clear', () => {
    let contactName = element(by.id('contact-name'));
    contactName.sendKeys('foobar');
    contactName.clear();
    expect(contactName.getAttribute('value')).toBe('');
  });

  it('isDisplayed', () => {
    let contactName = element(by.id('contact-name'));
    expect(contactName.isDisplayed()).toBe(true);

    // manually change the input to not be visible by css
    browser.executeScript(
        'arguments[0].setAttribute(\'style\', \'display:none;\')',
        contactName.getWebElement());

    expect(contactName.isPresent()).toBe(true);
    expect(contactName.isDisplayed()).toBe(false);
  });
});