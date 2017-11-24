import * as fs from 'fs';
import * as looksSame from 'looks-same';
import * as os from 'os';
import * as path from 'path';
import {browser, by, element, ExpectedConditions as EC} from 'protractor';

import {WebElement} from '../../../contacts-app-starter/node_modules/@types/selenium-webdriver/index';

import {compareScreenshot} from './screenshot_helper';

const GOLDEN_IMG = path.join(__dirname, 'contact_list_golden.png');

describe('the contact list', () => {
  beforeAll(() => {
    browser.get('/');

    // Set the window size so the screenshots are consistent.
    browser.driver.manage().window().setSize(1024, 600);
  });

  it('should look right', (done) => {
    const list = element(by.css('app-contact-list'));
    // Need to manually wait for Angular, since takeScreenshot() won't.
    browser.waitForAngular();

    // Verify that the list is loaded.
    expect(list.getText()).toContain('Jeff Pipe');
    browser.takeScreenshot()
        .then((data) => {
          return compareScreenshot(data, GOLDEN_IMG);
        })
        .then((result) => {
          expect(result).toBeTruthy();
          done();
        });
  });
});
