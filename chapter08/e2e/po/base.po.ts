import {browser as globalBrowser, element as globalElement, ElementHelper, ExpectedConditions as globalExpectedConditions, ProtractorBrowser, ProtractorExpectedConditions} from 'protractor';
import {promise as wdpromise} from 'selenium-webdriver';

export class PageObject {
  browser: ProtractorBrowser;
  element: ElementHelper;
  expectedConditions: ProtractorExpectedConditions;

  constructor(browser?: ProtractorBrowser) {
    if (browser) {
      this.browser = browser;
      this.element = browser.element;
      this.expectedConditions = browser.ExpectedConditions;
    } else {
      this.browser = globalBrowser;
      this.element = globalElement;
      this.expectedConditions = globalExpectedConditions;
    }
  }

  getCurrentUrl() {
    return this.browser.getCurrentUrl();
  }
}