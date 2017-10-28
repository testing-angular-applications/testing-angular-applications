import {browser, by, element, ExpectedConditions as EC} from 'protractor';
import * as fs from 'fs';

/**
 * Example plugin that takes a screenshot on test failure.
 */
export function postTest(passed: boolean, testInfo: any) {
  if(!passed) {
    const fileName = `${testInfo.name.replace(/ /g, '_')}_failure.png`
    return browser.takeScreenshot().then((data) => {
      fs.writeFileSync(fileName, data, 'base64')
    });
  }
}