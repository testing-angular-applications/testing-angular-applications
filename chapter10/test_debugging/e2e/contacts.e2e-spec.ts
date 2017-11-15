import {browser, by, element, ExpectedConditions as EC} from 'protractor';

describe('contacts test', () => {
  beforeEach(() => {
    return browser.waitForAngularEnabled(true).then(
        () => {return browser.get('/contact/4')});
  });

  /*
  it('should open the dialog with waitForAngular', () => {
    let feedButton = element(by.css('button.feed-button'));
    feedButton.click();

    let dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'))
    expect(dialogTitle.getText()).toContain('Latest posts from Craig Service')

    let closeButton = element(by.css('button[mat-dialog-close]'))

    // This closes the dialog, but we need to wait for the animation to
    // complete, even with automatic angular waiting enable.
    closeButton.click();

    browser.wait(EC.stalenessOf(dialogTitle), 3000, 'Waiting for dialog to
  close');
    // This closes the dialog, but the expectation fails because the title is
  still displayed
    // while the dialog close animation runs.
    expect(dialogTitle.isPresent()).toBeFalsy();
  })
  */

  it('should open the dialog with waitForAngular', (done) => {
    let feedButton = element(by.css('button.feed-button'));
    let closeButton = element(by.css('button[mat-dialog-close]'))
    let dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'))

    return feedButton.click()
        .then(() => {
          return dialogTitle.getText();
        })
        .then((dialogText) => {
          expect(dialogText).toContain('Latest posts from Craig Service')

          // This closes the dialog, but we need to wait for the animation to
          // complete, even with automatic angular waiting enable.
          return closeButton.click();
        })
        .then(() => {
          // Wait for the close animation to finish.
          return browser.wait(
              EC.stalenessOf(dialogTitle), 3000, 'Waiting for dialog to close');
        })
        .then(() => {
          return dialogTitle.isPresent();
        })
        .then((dialogTitleIsPresent) => {
          expect(dialogTitleIsPresent).toBeFalsy();
          done();
        });
  })

  fit('should open the dialog with waitForAngular', async () => {
    let feedButton = element(by.css('button.feed-button'));
    let closeButton = element(by.css('button[mat-dialog-close]'))
    let dialogTitle = element(by.css('app-contact-feed h2.mat-dialog-title'));

    await feedButton.click()
    let dialogText = await dialogTitle.getText();
    expect(dialogText).toContain('Latest posts from Craig Service')
    debugger

        // This closes the dialog, but we need to wait for the animation to
        // complete, even with automatic angular waiting enable.
        await closeButton.click();

    // Wait for the close animation to finish.
    await browser.wait(
        EC.stalenessOf(dialogTitle), 3000, 'Waiting for dialog to close');
    let dialogTitleIsPresent = await dialogTitle.isPresent();
    expect(dialogTitleIsPresent).toBeFalsy();
  });
})