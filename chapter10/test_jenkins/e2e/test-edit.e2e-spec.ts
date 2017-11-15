import {browser, by, element} from 'protractor';

describe('test edit a contact', () => {
  beforeAll(() => {
    browser.get('/');
  });

  it('should edit Rusty Component name to Rusted Component', () => {
    let tr = element.all(by.css('tbody tr')).get(1);
    let editTd = tr.all(by.tagName('td')).get(4);
    let favIcon = editTd.element(by.tagName('mat-icon'));
    favIcon.click();

    let inputName = element(by.css('input[placeholder="Name"]'));
    expect(inputName.getAttribute('value')).toBe('Rusty Component');
    inputName.clear();
    inputName.sendKeys('Rusted Component');
    expect(inputName.getAttribute('value')).toBe('Rusted Component');

    element.all(by.tagName('button')).get(0).click();

    let nameTd = tr.all(by.tagName('td')).get(1);
    expect(nameTd.getText()).toBe('Rusted Component');
  });
});