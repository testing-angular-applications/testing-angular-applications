import {browser, by, element, ElementFinder} from 'protractor';

describe('listing example', () => {
  beforeAll(() => {
    browser.get('/');
  });

  it('should add Rusty Component as a favorite', () => {
    let tr = element.all(by.css('tbody tr')).get(1);
    let favTd = tr.all(by.tagName('td')).get(6);
    let favIcon = favTd.element(by.tagName('i'));
    favIcon.click();
    expect(favIcon.getAttribute('style')).toContain('color: gold;');
  });
});