import { Chapter7StarterPage } from './app.po';

describe('chapter-7-starter App', function() {
  let page: Chapter7StarterPage;

  beforeEach(() => {
    page = new Chapter7StarterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
