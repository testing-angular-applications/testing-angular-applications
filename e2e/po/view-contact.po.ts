import { PageObject } from './base.po';
import { browser, by, promise as wdpromise,
  ElementArrayFinder, ElementFinder, ProtractorBrowser } from 'protractor';


export class ViewContactPageObject extends PageObject {
  name: ElementFinder;
  props: ElementArrayFinder;

  constructor(browser?: ProtractorBrowser) {
    super(browser);
    this.name = this.element(by.css('.mat-card .mat-card-title'));
    this.props = this.element.all(by.css('.mat-card .mat-card-subtitle'));
  }

  navigateTo(contactNumber: number) {
    this.browser.get('/contact/' + contactNumber);
  }

  verifyUrl(contactNumber: number) {
    expect(this.browser.getCurrentUrl())
      .toEqual(this.browser.baseUrl + '/contact/' + contactNumber);
  }

  getName() {
    return this.name.getText();
  }

  getEmail(): wdpromise.Promise<string> {
    return this.props.count().then(count => {
      if (count === 2) {
        return this.props.get(0).getText();
      } else {
        // test if the first item matches email
        return this.props.get(0).getText().then(text => {
          if (text.indexOf('@') !== -1) {
            return text;
          } else {
            return '';
          }
        });
      }
    });
  }
  
  getPhoneNumber() {
    return this.props.count().then(count => {
      if (count === 2) {
        return this.props.get(1).getText();
      } else {
        // test if the first item matches email
        return this.props.get(0).getText().then(text => {
          console.log(text);
          if (text.indexOf('@') !== -1) {
            return '';
          } else {
            return text;
          }
        });
      }
    });
  }
}