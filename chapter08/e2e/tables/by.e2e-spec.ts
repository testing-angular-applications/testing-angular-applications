import {browser, by, By, element, ProtractorBy} from 'protractor';
import {By as WebdriverBy} from 'selenium-webdriver';

describe('by methods', () => {
  beforeEach(() => {
    browser.get('/add');
  });

  it('by.css', () => {
    let byCss = by.css('.mat-card');
    let wdByCss = WebdriverBy.css('.mat-card');
    expect(element(byCss).getTagName()).toEqual('mat-card');
    expect(byCss instanceof WebdriverBy).toBeTruthy();
    expect(wdByCss instanceof WebdriverBy).toBeTruthy();
  });

  it('by.id', () => {
    let byId = by.id('contact-name');
    let input = element(byId);
    let wdById = WebdriverBy.id('contact-name');
    expect(element(byId).getTagName()).toEqual('input');
    // expect(byId instanceof WebdriverBy).toBeTruthy();
    expect(wdById instanceof WebdriverBy).toBeTruthy();
  });

  it('by.buttonText and by.partialButtonText', () => {
    element(by.id('contact-name')).sendKeys('Ada');
    let byButtonText = by.buttonText('Create');
    let byPartialButtonText = by.partialButtonText('Cre');
    let createButton1 = element(byButtonText);
    let createButton2 = element(byPartialButtonText);
    expect(createButton1.getText()).toBe(createButton2.getText());
  });

  it('by.linkText or by.partialLinkText', () => {
    let byLinkText = by.linkText('Contacts');
    let byPartialLinkText = by.partialLinkText('Contac');
    let titleBar1 = element(byLinkText);
    let titleBar2 = element(byPartialLinkText);
    expect(titleBar1.getText()).toBe(titleBar2.getText());
  });

  it('by.tagName', () => {
    let h4ByTagName = by.tagName('h4');
    let labelByTagName = by.tagName('label');
    expect(element(h4ByTagName).getText()).toBe('Add New Contact');
    // The following returns a warning. There are several web elements with tag
    // name 'label': expect(element(labelByTagName).getText()).toBe('Name');
    // Instead use element.all and get the first label.
    expect(element.all(labelByTagName).get(0).getText()).toBe('Name *');
  });

  it('by.xpath', () => {
    let byXpath1 = by.xpath('//mat-card/div/h4');
    expect(element(byXpath1).getText()).toBe('Add New Contact');

    // Let's try this again. They are nested but let's say we forgot to put in
    // the div tags. The actual xpath for this is
    // //app-new-contact/div/mat-card/div/h4 It is important to note that finding
    // an element based on xpath should be avoided if possible because it can
    // cause brittle tests.
    let byXpath2 = by.xpath('//app-new-contact/mat-card/h4');
    let text: string = null;
    element(byXpath2)
        .getText()
        .then(() => {
          console.log('this should not work');
        })
        .catch(err => {
          expect(err.toString()).toContain('No element found using locator');
        });
  });

  it('Protractor by or By is different than a Webdriver By', () => {
    // Type in name so the create button will appear.
    element(by.id('contact-name')).sendKeys('Protractor By or Webdriver By');

    // Sometimes these are the same thing.
    let byCss = by.css('.mat-card');
    let wdByCss = WebdriverBy.css('.mat-card');
    expect(element(byCss).getTagName()).toEqual('mat-card');
    expect(element(wdByCss).getTagName()).toEqual('mat-card');
    expect(byCss instanceof WebdriverBy).toBeTruthy();
    expect(wdByCss instanceof WebdriverBy).toBeTruthy();

    // Sometimes these are no the same thing.
    let byButtonText = by.buttonText('Create');
    expect(byButtonText instanceof WebdriverBy).not.toBeTruthy();

    // Turns out byButtonText is an object with type ProtractorLocator. We can
    // cast the object to the interface of ProtractorLocator which has types
    // column, findElementsOverride, and row. Remember since it is an interface,
    // we cannot test to see if it is an instanceof ProtractorLocator.
    //
    // import { ProtractorLocator } from 'protractor/built/locators';
    //
    // let protractorLocator = <ProtractorLocator> byButtonText;
    // console.log(protractorLocator.findElementsOverride);
  });
});