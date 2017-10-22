import {browser, by, element, ExpectedConditions as EC} from 'protractor';
import {promise as wdpromise} from 'selenium-webdriver';

/**
 * The contact list page object is the first page navigated when navigating to the
 * Angular application.
 */
export class ContactListPageObject {

  /**
   * Navigates to the contact list page.
   * @returns wdpromise.Promise<any> returns after navigating to the base url.
   */
  navigateTo(): wdpromise.Promise<any> {
    return browser.get('/');
  }

  /**
   * Gets the title string.
   * @returns wdpromise.Promise<string> the title string
   */
  getTitle(): wdpromise.Promise<string> {
    return element(by.css('.titleBar')).getText();
  }
}
